import jwt from 'jsonwebtoken';

const signToken = (payload: { id: string }, expiresIn: string) => {
	return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
		expiresIn,
	});
};

export default signToken;
