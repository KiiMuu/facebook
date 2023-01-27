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

		const post = await (
			await Post.create(req.body)
		).populate('user', 'firstName lastName picture username gender _id');

		return res.json(post);
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const getAllPosts = async (req: Request, res: Response) => {
	try {
		const posts = await Post.find({})
			.populate(
				'user',
				'firstName lastName picture cover username gender _id'
			)
			.sort({ createdAt: 'desc' })
			.exec();

		return res.json(posts);
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

export { createPost, getAllPosts };
