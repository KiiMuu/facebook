import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
