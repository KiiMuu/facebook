import jwt, { JwtPayload } from 'jsonwebtoken';

const signToken = (payload: { id: string }, expiresIn: string) => {
	return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
		expiresIn,
	});
};

const verifyToken = (token: string) => {
	return jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
};

export { signToken, verifyToken };
