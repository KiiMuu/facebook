import { Request, Response, NextFunction } from 'express';
import { BAD_REQ } from '../constants';
import { IError } from '../interfaces/user';
import { isEmail, isLength } from '../utils/user';

export const validateRegister = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { firstName, lastName, email, password } = req.body;

	let errors: IError[] = [];

	if (!isEmail(email)) {
		errors.push({
			param: 'email',
			message: 'Invalid email format. Please check it out.',
		});
	}

	if (!isLength(firstName, 3, 30)) {
		errors.push({
			param: 'firstName',
			message: 'First name must be between 3 and 30 characters long.',
		});
	}

	if (!isLength(lastName, 3, 30)) {
		errors.push({
			param: 'lastName',
			message: 'Last name must be between 3 and 30 characters long.',
		});
	}

	if (!isLength(password, 6, 40)) {
		errors.push({
			param: 'password',
			message: 'Password must be between 6 and 40 characters long.',
		});
	}

	if (errors.length) {
		return res.status(BAD_REQ).json(errors);
	}

	next();
};
