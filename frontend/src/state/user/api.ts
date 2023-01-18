import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RegisterInput } from 'src/interfaces/user';

export const register = createAsyncThunk(
	'user/register',
	async (userData: RegisterInput, { rejectWithValue }) => {
		const {
			firstName,
			lastName,
			email,
			password,
			bYear,
			bMonth,
			bDay,
			gender,
		} = userData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/user/register`,
				{
					firstName,
					lastName,
					email,
					password,
					bYear,
					bMonth,
					bDay,
					gender,
				}
			);

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const login = createAsyncThunk(
	'user/login',
	async (
		userData: { email: string; password: string },
		{ rejectWithValue }
	) => {
		const { email, password } = userData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/user/login`,
				{
					email,
					password,
				}
			);

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const verifyAccount = createAsyncThunk(
	'user/verifyAccount',
	async (userData: { token?: string }, thunkAPI: any) => {
		const { token } = userData;
		const currentUser = JSON.parse(Cookies.get('fb_user') as string);

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/user/verify`,
				{ token },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			Cookies.set(
				'fb_user',
				JSON.stringify({ ...currentUser, verified: true }),
				{ expires: 7, sameSite: 'none' }
			);

			return data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const resendVerificationCode = createAsyncThunk(
	'user/resendVerificationCode',
	async (userData: { token: string }, { rejectWithValue }) => {
		const { token } = userData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/user/resend_verification_code`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const findUser = createAsyncThunk(
	'user/find_user',
	async (userData: { email: string }, { rejectWithValue }) => {
		const { email } = userData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/user/find_user`,
				{ email }
			);

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const sendResetPasswordEmail = createAsyncThunk(
	'user/sendResetPassword',
	async (userData: { email: string }, { rejectWithValue }) => {
		const { email } = userData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/user/send_reset_password`,
				{ email }
			);

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const validateResetCode = createAsyncThunk(
	'user/validateResetCode',
	async (userData: { email: string; code: number }, { rejectWithValue }) => {
		const { email, code } = userData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/user/validate_reset_code`,
				{ email, code }
			);

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const changePassword = createAsyncThunk(
	'user/changePassword',
	async (
		userData: { email: string; password: string },
		{ rejectWithValue }
	) => {
		const { email, password } = userData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/user/change_password`,
				{ email, password }
			);

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const getUserProfile = createAsyncThunk(
	'post/getUserProfile',
	async (
		userData: { token?: string; username?: string },
		{ rejectWithValue }
	) => {
		const { token, username } = userData;

		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/user/profile/${username}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);
