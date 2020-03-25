import { Router, Request, Response } from 'express';

import { getEventById } from '../../../../../database/controllers/EventController';
import { UserDocument } from 'server/database/models/User';

const allEventsRoute:Router = Router();

allEventsRoute.get(
	'/',
	async (req:Request, res: Response): Promise<void> => {
		const { user } = req;
		const { id } = req.params;
		const userId = user && (user as UserDocument)._id;
		try {
			const event = await getEventById(id);
			if( event.creatorId !==  userId ) {
				res.status(401).json({error: 'unauthorized'});
				return;
			}
			res.status(200).json(event);
		} catch (err) {
			console.error(err);
			res.status(500).json({error: true});
		}
	}
);

export default allEventsRoute;