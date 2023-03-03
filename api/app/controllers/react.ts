import { Request, Response } from 'express';
import { OK, SERVER_ERR, BAD_REQ } from '../constants';
import { IReact, IReactModel } from '../interfaces/react';
import React from '../models/React';

const reactOnPost = async (req: Request, res: Response) => {
	try {
		const { postId, react } = req.body;

		const isReactExist = await React.findOne({
			postRef: postId,
			reactedBy: req.user.id,
		});

		if (!postId) {
			return res.status(BAD_REQ).json({
				message: 'It seems that the post is not found',
			});
		}

		if (!react) {
			return res.status(BAD_REQ).json({
				message: 'It seems that the react is not found',
			});
		}

		if (!isReactExist) {
			let newReact = new React({
				react,
				postRef: postId,
				reactedBy: req.user.id,
			});

			await newReact.save();
		} else {
			if (isReactExist.react == react) {
				await React.findByIdAndRemove(isReactExist._id);
			} else {
				await React.findByIdAndUpdate(
					isReactExist._id,
					{
						react,
					},
					{ new: true }
				);
			}
		}

		return res.status(OK).json({ type: react });
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

const getPostReacts = async (req: Request, res: Response) => {
	try {
		const { postId } = req.params;

		if (!postId) {
			return res.status(BAD_REQ).json({
				message: 'It seems that the post is not found',
			});
		}

		const reacts = await React.find({ postRef: postId });

		const reactedByMeType = await React.findOne({
			postRef: postId,
			reactedBy: req.user.id,
		}).select('react');

		// OR
		// const reactedByMeType = reacts.find(
		// 	r => r.reactedBy.toString() === req.user.id
		// )?.react;

		const newReacts = reacts.reduce((prev: any, current: IReact) => {
			let key = current.react;

			prev[key] = prev[key] || [];
			prev[key].push(current);

			return prev;
		}, {});

		const finalReacts = [
			{
				react: 'like',
				count: newReacts?.like ? newReacts?.like?.length : 0,
			},
			{
				react: 'love',
				count: newReacts?.love ? newReacts?.love?.length : 0,
			},
			{
				react: 'sad',
				count: newReacts?.sad ? newReacts?.sad?.length : 0,
			},
			{
				react: 'wow',
				count: newReacts?.wow ? newReacts?.wow?.length : 0,
			},
			{
				react: 'angry',
				count: newReacts?.angry ? newReacts?.angry?.length : 0,
			},
			{
				react: 'haha',
				count: newReacts?.haha ? newReacts?.haha?.length : 0,
			},
		];

		return res.status(OK).json({
			reacts: finalReacts,
			total: reacts.length,
			reactedByMeType: reactedByMeType?.react,
		});
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

export { reactOnPost, getPostReacts };
