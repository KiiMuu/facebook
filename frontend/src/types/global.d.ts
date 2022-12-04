export {};

declare global {
	interface UserInfo {
		_id: string;
		firstName: string;
		lastName: string;
		username: string;
		picture: string;
		verified: boolean;
	}
	interface Error {
		param: string;
		message: string;
	}
}
