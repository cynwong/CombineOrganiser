import { Request, Response, NextFunction } from 'express';

// Authentication Middleware functions
// Do not allow user to access without login
export const checkIfAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({ error: 'Unauthorized' });
};

// do not allow login-user to access
export const forwardIfNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	return res.end();
};
