import { Document } from 'mongoose';

export interface IUserModel extends Document {
	_id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	picture: string;
	cover: string;
	gender: string;
	bYear: number;
	bMonth: number;
	bDay: number;
	verified: boolean;
	friends: object[];
	following: object[];
	followers: object[];
	requests: object[];
	search: object[];
	details: {
		bio: string;
		otherName: string;
		job: string;
		workPlace: string;
		highSchool: string;
		college: string;
		currentCity: string;
		homeTown: string;
		relationship: string;
		instagram: string;
	};
	savedPosts: [
		{
			post: string;
			savedAt: Date;
		}
	];
}

export interface IError {
	param: string;
	message: string;
}
