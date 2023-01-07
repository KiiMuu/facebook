import { Document } from 'mongoose';

interface IPostComment {
	comment: string;
	image: string;
	commentedBy: string;
	commentedAt: Date;
}

export interface IPostModel extends Document {
	_id: string;
	type: string;
	text: string;
	images: string[];
	user: string;
	background: string;
	comments: IPostComment[];
}
