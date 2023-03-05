export interface LeftLinkProps {
	img: string;
	text: string;
	notification?: string;
	url?: string;
}

export interface ShortcutProps {
	link: string;
	img: string;
	name: string;
}

export interface StoryProps {
	profile_picture: string;
	profile_name: string;
	image: string;
}

export interface ActivateAccountProps {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	errorMsg?: string;
	successMsg?: string;
}
