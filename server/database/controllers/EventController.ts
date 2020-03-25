import { EventDocument, Event } from '../../database/models/Event';

import { Schema } from 'mongoose';

export const createEvent = async (data: EventDocument):Promise<any> => {
	return Event.create(data);
}

export const getAllEvents = async (userId:string):Promise<any> => {
	return Event.find({ creator : userId });
}

export const getEventById = async (id:string):Promise<any> => {
	return Event.findById(id);
}

// export const getEvent = async (id:Schema.Types.ObjectId):Promise<any> => {
// 	return Event.findById(id);
// }