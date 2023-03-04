import { Request, Response } from 'express';
import Post from '../models/Post';
import { BAD_REQ, SERVER_ERR } from '../constants';

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
			.populate(
				'comments.commentedBy',
				'username firstName lastName picture'
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

const createComment = async (req: Request, res: Response) => {
	try {
		const { postId, comment, image } = req.body;

		if (!postId) {
			return res.status(BAD_REQ).json({
				message: "Something went wrong. Couldn't create a comment.",
			});
		}

		const newPostComment = await Post.findByIdAndUpdate(
			postId,
			{
				$push: {
					comments: {
						comment,
						image,
						commentedBy: req.user.id,
					},
				},
			},
			{ new: true }
		);

		await newPostComment?.populate(
			'comments.commentedBy',
			'username firstName lastName picture'
		);

		return res.json(newPostComment?.comments);
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

export { createPost, getAllPosts, createComment };
