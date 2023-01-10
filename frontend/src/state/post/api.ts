import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CreatePostProps } from 'src/interfaces/post';

export const createPost = createAsyncThunk(
	'post/create',
	async (postData: CreatePostProps, { rejectWithValue }) => {
		const { type, background, text, images, user, token } = postData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/post/create`,
				{
					type,
					background,
					text,
					images,
					user,
				},
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

export const uploadImages = createAsyncThunk(
	'cloudinary/images',
	async (
		uploadData: { formData: any; token?: string },
		{ rejectWithValue }
	) => {
		const { formData, token } = uploadData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/cloudinary/images`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
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
