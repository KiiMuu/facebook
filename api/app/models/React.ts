import { Schema, model } from 'mongoose';
import { IReactModel } from '../interfaces/react';

const { ObjectId } = Schema.Types;

const ReactSchema: Schema = new Schema(
	{
		react: {
			type: String,
			enum: ['like', 'love', 'haha', 'sad', 'angry', 'wow'],
			required: true,
		},
		postRef: {
			type: ObjectId,
			ref: 'Post',
		},
		reactedBy: {
			type: ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const React = model<IReactModel>('React', ReactSchema);

export default React;
