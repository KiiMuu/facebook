export interface RegisterInput {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	bYear: number;
	bMonth: number;
	bDay: number;
	gender: string;
}

interface FoundUser {
	email: string;
	picture: string;
}

export type searchHistory = {
	user: UserInfo | null;
	createdAt?: string;
	_id?: string;
};

export interface SliceState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	searchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	errors: any;
	successMsg?: string;
	errorMsg?: string;
	profileNotFoundMsg?: string;
	user: UserInfo | null;
	foundUser: FoundUser | null;
	profile: IProfile | null;
	searchResults: IProfile[];
	searchHistory: {
		search: searchHistory[];
	};
	searchHistoryFetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface SearchedUser {
	foundUser: FoundUser;
	sendEmailToResetPassword: (email: string) => void;
	errorMsg?: string;
}

export interface ISearchAccount {
	errorMsg?: string;
	searchForUser: (email: string) => void;
}

export interface ICodeVerification {
	errorMsg?: string;
	successMsg?: string;
	validateCode: (email: string, code: number) => void;
	email: string;
}

export interface IChangePassword {
	errorMsg?: string;
	successMsg?: string;
	handlePasswordChange: (email: string, password: string) => void;
	email: string;
}
