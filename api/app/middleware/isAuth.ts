import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BAD_REQ, SERVER_ERR } from '../constants';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
	try {
		let tmp = req.header('Authorization');

		// token will be something like that
		// 'Bearer K39XM200Mjkmcd92jkdcvfvjk', exclude the 1st seven chars to get the token
		const token = tmp?.slice(7, tmp.length);

		if (!token) {
			return res.status(BAD_REQ).json({
				message: 'Invalid Authentication.',
			});
		}

		jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
			if (err) {
				return res.status(BAD_REQ).json({
					message: 'Invalid Authentication.',
				});
			}

			req.user = user;

			next();
		});
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

export default isAuth;
