export interface IReactPayload {
	postId?: string;
	react?: string;
	token?: string;
}

export interface IReact {
	_id: string;
	react: string;
	postRef: string;
	reactedBy: string;
}

export interface IReactCount {
	react?: string;
	count?: number;
}

export interface SliceState {
	reactStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	postReacts: IReact[];
	reactedByMeType: string | null;
}
