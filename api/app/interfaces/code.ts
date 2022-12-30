import { Document } from 'mongoose';

export interface ICodeModel extends Document {
	_id: string;
	code: string;
	user: string;
}
