import { Document } from 'mongoose';

export type IReact = {
	_id: string;
	react: 'like' | 'love' | 'haha' | 'sad' | 'angry' | 'wow';
	postRef: string;
	reactedBy: string;
};

export interface IReactModel extends Document {
	_id: IReact['_id'];
	react: IReact['react'];
	postRef: IReact['postRef'];
	reactedBy: IReact['reactedBy'];
}
