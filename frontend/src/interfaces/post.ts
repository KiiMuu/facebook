export interface SliceState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: any;
	successMsg?: string;
	errorMsg?: string;
	createdPost: CreatePostProps;
}

export interface CreatePostProps {
	type: string | null;
	background: string | null;
	text: string | null;
	images: (string | ArrayBuffer | null | undefined)[] | null;
	user?: string;
	token?: string;
}
