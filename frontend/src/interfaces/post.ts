export interface SliceState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	postStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	commentStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	savePostStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	savedPostStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	isSavedPost: boolean;
	error: any;
	successMsg?: string;
	errorMsg?: string;
	createdPost: CreatePostProps;
	posts: IPost[];
	savedPosts: IPost[];
	postComments: IComment[];
}

export interface CreatePostProps {
	type: string | null;
	background: string | null;
	text: string | null;
	images: ICloudImage[] | null;
	user: UserInfo | null;
	token?: string;
	comments?: IComment[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IComment {
	_id?: string;
	postId?: string;
	comment?: string;
	image?: string | ArrayBuffer | null;
	token?: string;
	commentedBy?: IPublicUser;
	commentedAt?: Date;
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
