import { Request, Response } from 'express';
import User from '../models/User';
import {
	comparePasswords,
	hashPassword,
	validateUsername,
} from '../utils/user';
import { BAD_REQ, NOT_FOUND, OK, SERVER_ERR } from '../constants';
import { signToken, verifyToken } from '../utils/token';
import {
	resetPassowrdCodeVerificationEmail,
	sendVerificationEmail,
} from '../utils/mailer';
import { IUserModel } from '../interfaces/user';
import { JwtPayload } from 'jsonwebtoken';
import Code from '../models/Code';
import generateCode from '../utils/generateCode';
import Post from '../models/Post';

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
		const validUser = req.user.id;
		const { token } = req.body;

		const user: JwtPayload = verifyToken(token);

		const isAlreadyExists = await User.findById(user.id);

		if (validUser !== user.id) {
			return res.status(BAD_REQ).json({
				message:
					"You don't have the authorization to complete this operation.",
			});
		}

		if (isAlreadyExists?.verified) {
			return res.status(BAD_REQ).json({
				message: 'This email is already actiavted.',
			});
		} else {
			await User.findByIdAndUpdate(
				user.id,
				{ verified: true },
				{ new: true }
			);

			return res.status(OK).json({
				message: 'Account has been activated successfully.',
			});
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

		const token: string = signToken({ id: user._id }, '7d');

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

const resendVerificationCode = async (req: Request, res: Response) => {
	try {
		const id = req.user.id;
		const user = await User.findById(id).exec();

		if (user?.verified) {
			return res.status(BAD_REQ).json({
				message: 'This account is already actiavted.',
			});
		}

		const emailVerificationToken = signToken({ id: user!._id }, '30m');

		const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;

		sendVerificationEmail(user!.email, user!.firstName, url);

		return res.status(OK).json({
			message: 'Email verification link has been sent to you.',
		});
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const findUser = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email }).select('-password').exec();

		if (!user) {
			return res.status(BAD_REQ).json({
				message: 'This account is not exist.',
			});
		}

		return res.status(OK).json({
			email: user.email,
			picture: user.picture,
		});
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const sendResetPasswordCode = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email }).select('-password').exec();
		await Code.findOneAndRemove({ user: user?._id }).exec();
		const code = generateCode(5);

		await Code.create({
			code,
			user: user?._id,
		});

		resetPassowrdCodeVerificationEmail(user?.email, user?.firstName, code);

		return res.status(OK).json({
			message: `Reset password email has been sent to ${user?.email}.`,
		});
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const validateResetCode = async (req: Request, res: Response) => {
	try {
		const { email, code } = req.body;
		const user = await User.findOne({ email }).select('-password').exec();
		const userCode = await Code.findOne({ user: user?._id }).exec();

		if (userCode?.code !== code) {
			return res.status(BAD_REQ).json({
				message: 'Invalid code.',
			});
		}

		return res.status(OK).json({ message: 'Ok' });
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const changePassword = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const hashedPassword = await hashPassword(password);

		await User.findOneAndUpdate(
			{ email },
			{ password: hashedPassword },
			{ new: true }
		).exec();

		return res.status(OK).json({ message: 'Password has been changed' });
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const getProfile = async (req: Request, res: Response) => {
	try {
		const { username } = req.params;

		const profile = await User.findOne({ username })
			.select('-password')
			.exec();

		if (!profile) {
			return res.status(NOT_FOUND).json({
				message:
					'It seems that the user does not exist or has been removed.',
			});
		}

		const posts = await Post.find({ user: profile._id })
			.sort({ createdAt: -1 })
			.populate('user')
			.exec();

		return res.status(OK).json({ ...profile.toObject(), posts });
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const updateProfilePicture = async (req: Request, res: Response) => {
	try {
		const { url } = req.body;

		const updatedProfilePic = await User.findByIdAndUpdate(
			req.user.id,
			{
				picture: url,
			},
			{ new: true }
		).select('picture');

		return res.status(OK).json(updatedProfilePic);
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const updateCoverPhoto = async (req: Request, res: Response) => {
	try {
		const { url } = req.body;

		const updatedCoverPhoto = await User.findByIdAndUpdate(
			req.user.id,
			{
				cover: url,
			},
			{ new: true }
		).select('cover');

		return res.status(OK).json(updatedCoverPhoto);
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

export {
	register,
	verifyAccount,
	login,
	resendVerificationCode,
	findUser,
	sendResetPasswordCode,
	validateResetCode,
	changePassword,
	getProfile,
	updateProfilePicture,
	updateCoverPhoto,
};
