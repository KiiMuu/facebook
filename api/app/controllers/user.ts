import { Request, Response } from 'express';
import User from '../models/User';
import {
	comparePasswords,
	hashPassword,
	validateUsername,
} from '../utils/user';
import { BAD_REQ, OK, SERVER_ERR } from '../constants';
import { signToken, verifyToken } from '../utils/token';
import sendVerificationEmail from '../utils/mailer';
import { IUserModel } from '../interfaces/user';
import { JwtPayload } from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			bYear,
			bMonth,
			bDay,
			gender,
		} = req.body;

		const isAlreadyExists = await User.findOne({ email }).exec();

		if (isAlreadyExists) {
			return res.status(BAD_REQ).json([
				{
					param: 'email',
					message: 'This email already exists. Try another one.',
				},
			]);
		}

		const hashedPassword = await hashPassword(password);

		let tempUsername = firstName + lastName;

		let newUsername = await validateUsername(tempUsername);

		const user: IUserModel = await new User({
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

		const emailVerificationToken = signToken({ id: user._id }, '30m');

		const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;

		sendVerificationEmail(user.email, user.firstName, url);

		const token = signToken({ id: user._id }, '7d');

		return res.send({
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			picture: user.picture,
			verified: user.verified,
			token,
			message:
				'Registeration Success | Please activate your email to start.',
		});
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const verifyAccount = async (req: Request, res: Response) => {
	try {
		const { token } = req.body;

		const user: JwtPayload = verifyToken(token);

		const isAlreadyExists = await User.findById(user.id);

		if (isAlreadyExists?.verified) {
			return res.status(BAD_REQ).json([
				{
					param: 'email',
					message: 'This email is already actiavted.',
				},
			]);
		} else {
			await User.findByIdAndUpdate(
				user.id,
				{ verified: true },
				{ new: true }
			);

			return res.status(OK).json([
				{
					param: 'email',
					message: 'Account has been activated successfully.',
				},
			]);
		}
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email }).exec();

		if (!user) {
			return res.status(BAD_REQ).json([
				{
					param: 'email',
					message:
						'The email you entered is not connected to an account.',
				},
			]);
		}

		const isCorrectPassword = await comparePasswords(
			password,
			user.password
		);

		if (!isCorrectPassword) {
			return res.status(BAD_REQ).json([
				{
					param: 'email',
					message: 'Invalid credentials. Please try again.',
				},
			]);
		}

		const token = signToken({ id: user._id }, '7d');

		return res.send({
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			picture: user.picture,
			verified: user.verified,
			token,
		});
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

export { register, verifyAccount, login };
