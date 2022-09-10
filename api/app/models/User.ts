import { Schema, model } from 'mongoose';
import { IUserModel } from '../interfaces/user';

const { ObjectId } = Schema.Types;

const UserSchema: Schema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, 'First Name is required.'],
			trim: true,
			text: true,
		},
		lastName: {
			type: String,
			required: [true, 'Last Name is required.'],
			trim: true,
			text: true,
		},
		username: {
			type: String,
			required: [true, 'Username is required.'],
			trim: true,
			text: true,
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required.'],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required.'],
		},
		picture: {
			type: String,
			default:
				'https://res.cloudinary.com/ndsnvf0/image/upload/v1662653386/facebook/pngfind.com-default-image-png-6764065_h7hrmv.png',
		},
		cover: {
			type: String,
			default: 'some links here',
		},
		gender: {
			type: String,
			required: [true, 'Gender is required.'],
			enum: ['male', 'female'],
		},
		bYear: {
			type: Number,
			required: true,
			trim: true,
		},
		bMonth: {
			type: Number,
			required: true,
			trim: true,
		},
		bDay: {
			type: Number,
			required: true,
			trim: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		friends: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: [],
		},
		followers: {
			type: Array,
			default: [],
		},
		requests: {
			type: Array,
			default: [],
		},
		search: [
			{
				user: {
					type: ObjectId,
					ref: 'User',
				},
			},
		],
		details: {
			bio: {
				type: String,
			},
			otherName: {
				type: String,
			},
			job: {
				type: String,
			},
			workPlace: {
				type: String,
			},
			highSchool: {
				type: String,
			},
			college: {
				type: String,
			},
			currentCity: {
				type: String,
			},
			homeTown: {
				type: String,
			},
			relationship: {
				type: String,
				enum: ['Single', 'In a relationship', 'Married', 'Divorced'],
			},
			instagram: {
				type: String,
			},
		},
		savedPosts: [
			{
				post: {
					type: ObjectId,
					ref: 'Post',
				},
				savedAt: {
					type: Date,
					default: new Date(),
				},
			},
		],
	},
	{ timestamps: true }
);

const User = model<IUserModel>('User', UserSchema);

export default User;