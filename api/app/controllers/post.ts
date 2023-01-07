import { Request, Response } from 'express';
import Post from '../models/Post';
import { SERVER_ERR } from '../constants';

const createPost = async (req: Request, res: Response) => {
	try {
		const { user } = req.body;

		if (!user) {
			return res.status(400).json({
				message: "Something went wrong. Couldn't create a post.",
			});
		}

		const post = await Post.create(req.body);

		return res.json(post);
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

export { createPost };
