import bcrypt from 'bcrypt';
import User from '../models/User';

const isEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

const isLength = (text: string, max: number, min: number) => {
	if (text?.length > min || text?.length < max) return false;

	return true;
};

const hashPassword = async (password: string) => {
	return bcrypt.hash(password, 12);
};

const comparePasswords = async (password: string, userPassword: string) => {
	return bcrypt.compare(password, userPassword);
};

// add a random number at the end of a combined username if it already exists!
// karimmuh1, karimmuh5, karimmuh192, etc
const validateUsername = async (username: string) => {
	let a = false;

	do {
		let isAlreadyExists = await User.findOne({ username });

		if (isAlreadyExists) {
			username += (+new Date() * Math.random())
				.toString()
				.substring(0, 1);
			a = true;
		} else {
			a = false;
		}
	} while (a);

	return username;
};

export { isEmail, isLength, hashPassword, comparePasswords, validateUsername };
