import { Request, Response } from 'express';
import User from '../models/User';
import { hashPassword, validateUsername } from '../utils/user';
import { BAD_REQ, SERVER_ERR } from '../constants';

const register = async (req: Request, res: Response) => {
	try {
		const {
			firstName,
			lastName,
			email,
			username,
			password,
			bYear,
			bMonth,
			bDay,
			gender,
		} = req.body;

		const isAlreadyExists = await User.findOne({ email }).exec();

		if (isAlreadyExists) {
			return res.status(BAD_REQ).json({
				message: 'This email already exists. Try another one.',
			});
		}

		const hashedPassword = await hashPassword(password);

		let tempUsername = firstName + lastName;

		let newUsername = await validateUsername(tempUsername);

		const user = await new User({
			firstName,
			lastName,
			email,
			username: newUsername,
			password: hashedPassword,
			bYear,
			bMonth,
			bDay,
			gender,
		}).save();

		return res.json(user);
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

export { register };
