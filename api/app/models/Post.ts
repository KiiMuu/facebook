import { Schema, model } from 'mongoose';
import { IPostModel } from '../interfaces/post';

const { ObjectId } = Schema.Types;

const PostSchema = new Schema(
	{
		type: {
			type: String,
			enum: ['profilePicture', 'cover', null],
			default: null,
		},
		text: {
			type: String,
		},
		images: {
			type: Array,
		},
		user: {
			type: ObjectId,
			ref: 'User',
			required: true,
		},
		background: {
			type: String,
		},
		savedBy: {
			type: ObjectId,
			ref: 'User',
		},
		comments: [
			{
				comment: {
					type: String,
				},
				image: {
					type: String,
				},
				commentedBy: {
					type: ObjectId,
					ref: 'User',
				},
				commentedAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true }
);

const Post = model<IPostModel>('Post', PostSchema);

export default Post;
