export {};

declare global {
	interface UserInfo {
		_id: string;
		id: string;
		firstName: string;
		lastName: string;
		username: string;
		picture: string;
		verified: boolean;
		gender: string;
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
		background?: string;
		setBackground?: React.Dispatch<React.SetStateAction<string>>;
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
		setLocalError: React.Dispatch<React.SetStateAction<string>>;
	}
	interface IPublicUser {
		_id: string;
		firstName: string;
		lastName: string;
		username: string;
		picture: string;
		gender: string;
	}
	interface IPersonCard {
		profile_picture: string;
		profile_name: string;
		image: string;
	}
	interface IProfile {
		_id: string;
		id: string;
		firstName: string;
		lastName: string;
		username: string;
		email: string;
		password: string;
		picture: string;
		cover: string;
		gender: string;
		bYear: number;
		bMonth: number;
		bDay: number;
		verified: boolean;
		friends: IPublicUser[];
		following: IPublicUser[];
		followers: IPublicUser[];
		requests: IPublicUser[];
		search: object[];
		details: {
			bio: string;
			otherName: string;
			job: string;
			workPlace: string;
			highSchool: string;
			college: string;
			currentCity: string;
			homeTown: string;
			relationship: string;
			instagram: string;
		};
		savedPosts: [
			{
				post: string;
				savedAt: Date;
			}
		];
	}
}
