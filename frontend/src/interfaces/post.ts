export interface SliceState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: any;
	successMsg?: string;
	errorMsg?: string;
	createdPost: CreatePostProps;
	posts: IPost[];
}

export interface CreatePostProps {
	type: string | null;
	background: string | null;
	text: string | null;
	images: ICloudImage[] | null;
	user: UserInfo | null;
	token?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IPost extends CreatePostProps {
	_id: string;
}

export interface ICloudImage {
	url: string;
}

export interface IPostOptions {
	icon?: string;
	title: string;
	subTitle?: string;
	img?: string;
}
