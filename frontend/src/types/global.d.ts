export {};

declare global {
	interface UserInfo {
		_id: string;
		firstName: string;
		lastName: string;
		username: string;
		picture: string;
		verified: boolean;
		token: string;
	}
	interface Error {
		param: string;
		message: string;
	}
	interface IEmojiComponent {
		firstName?: string;
		text: string;
		setText: React.Dispatch<React.SetStateAction<string>>;
		type2?: boolean;
		showPrev?: boolean;
	}
	interface IImagePreview {
		firstName?: string;
		text: string;
		setText: React.Dispatch<React.SetStateAction<string>>;
		type2?: boolean;
		showPrev?: boolean;
		images: (string | ArrayBuffer | null | undefined)[];
		setImages: React.Dispatch<
			React.SetStateAction<(string | ArrayBuffer | null | undefined)[]>
		>;
		setShowPrev: React.Dispatch<React.SetStateAction<boolean>>;
	}
}
