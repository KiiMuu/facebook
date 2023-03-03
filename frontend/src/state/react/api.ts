import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IReactPayload } from 'src/interfaces/react';

export const reactOnPost = createAsyncThunk(
	'/react/reactOnPost',
	async (reactData: IReactPayload, { rejectWithValue }) => {
		const { postId, react, token } = reactData;

		try {
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/react`,
				{ postId, react },
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

export const getPostReacts = createAsyncThunk(
	'/react/getPostReacts',
	async (reactData: Omit<IReactPayload, 'react'>, { rejectWithValue }) => {
		const { postId, token } = reactData;

		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/reacts/${postId}`,
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
