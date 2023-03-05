import { Request, Response } from 'express';
import Post from '../models/Post';
import { BAD_REQ, OK, SERVER_ERR } from '../constants';
import User from '../models/User';

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
		const followingTemp = await User.findById(req.user.id).select(
			'following'
		);

		const following = followingTemp?.following;

		// show all posts from the following users only
		const posts = await Post.find({ user: { $in: following } })
			.populate(
				'user',
				'firstName lastName picture cover username gender _id'
			)
			.populate(
				'comments.commentedBy',
				'username firstName lastName picture'
			)
			.sort({ createdAt: 'desc' })
			.limit(10)
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

const savePost = async (req: Request, res: Response) => {
	try {
		const { postId } = req.params;

		const user = await User.findById(req.user.id);

		const isSavedPost = user?.savedPosts.find(
			p => p.post.toString() === postId
		);

		if (isSavedPost) {
			await User.findByIdAndUpdate(req.user.id, {
				$pull: {
					savedPosts: {
						post: postId,
						savedBy: req.user.id,
					},
				},
			});

			await Post.findByIdAndUpdate(
				postId,
				{
					$pull: {
						savedBy: req.user.id,
					},
				},
				{ new: true }
			);

			return res.status(OK).json({
				message: 'Post has been deleted from your saved posts.',
				isSavedPost: false,
			});
		} else {
			await User.findByIdAndUpdate(
				req.user.id,
				{
					$push: {
						savedPosts: {
							post: postId,
							savedBy: req.user.id,
						},
					},
				},
				{ new: true }
			);

			await Post.findByIdAndUpdate(
				postId,
				{
					$push: {
						savedBy: req.user.id,
					},
				},
				{ new: true }
			);

			return res.status(OK).json({
				message: 'Post has been added to your saved posts.',
				isSavedPost: true,
			});
		}
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const getSavedPosts = async (req: Request, res: Response) => {
	try {
		const savedPosts = await Post.find({
			savedBy: req.user.id,
		}).populate('user', 'username firstName lastName picture');

		return res.status(OK).json(savedPosts);
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

export { createPost, getAllPosts, createComment, savePost, getSavedPosts };
