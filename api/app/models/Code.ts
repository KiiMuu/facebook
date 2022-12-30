import { Schema, model } from 'mongoose';
import { ICodeModel } from '../interfaces/code';

const { ObjectId } = Schema.Types;

const CodeSchema: Schema = new Schema(
	{
		code: {
			type: String,
			required: true,
		},
		user: {
			type: ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

const Code = model<ICodeModel>('Code', CodeSchema);

export default Code;
