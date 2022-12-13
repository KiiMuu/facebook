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

export interface SliceState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	errors: any;
	successMsg?: string;
	errorMsg?: string;
	user: UserInfo | null;
}
