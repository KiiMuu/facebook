import * as Yup from 'yup';

export const registerValidation = Yup.object().shape({
	firstName: Yup.string()
		.required('Whats is your first name.')
		.min(2, 'Too short name. should be 2 chars minimum.')
		.max(16, 'Too long name. should be 16 chars maximum.')
		.matches(/^[aA-zZ]+$/, 'Numbers and special chars are not allowed.'),
	lastName: Yup.string()
		.required('Whats is your last name.')
		.min(2, 'Too short name. should be 2 chars minimum.')
		.max(16, 'Too long name. should be 16 chars maximum.'),
	email: Yup.string()
		.required(
			'You will need this when you log in and if you ever need to reset your password.'
		)
		.email('Invalid email format.')
		.max(100, 'Maximum 100 for email address.'),
	password: Yup.string()
		.required('Password is required.')
		.min(6, 'Too short password. should be 6 chars minimum.'),
});

export const loginValidation = Yup.object().shape({
	email: Yup.string()
		.required('Email address is required.')
		.email('Invalid email format.')
		.max(100),
	password: Yup.string()
		.required('Password is required.')
		.min(6, 'Too short password. should be 6 chars minimum.'),
});
