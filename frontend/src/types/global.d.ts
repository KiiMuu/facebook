export {};

declare global {
	interface UserInfo {
		_id: string;
		firstName: string;
	}
	interface Error {
		param: string;
		message: string;
	}
}
