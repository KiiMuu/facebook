import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CreatePostProps, IComment } from 'src/interfaces/post';

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
					user: user?.id,
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

export const getAllPosts = createAsyncThunk(
	'post/getAllPosts',
	async (postData: { token?: string }, { rejectWithValue }) => {
		const { token } = postData;

		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/post/getAllPosts`,
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

export const createPostComment = createAsyncThunk(
	'post/createPostComment',
	async (postData: IComment, { rejectWithValue }) => {
		const { postId, comment, image, token } = postData;

		try {
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/post/comment/create`,
				{
					postId,
					comment,
					image,
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

export const savePost = createAsyncThunk(
	'post/savePost',
	async (
		postData: { postId?: string; token?: string },
		{ rejectWithValue }
	) => {
		const { postId, token } = postData;

		try {
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/post/save/${postId}`,
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

export const getSavedPosts = createAsyncThunk(
	'post/getSavedPosts',
	async (postData: { token?: string }, { rejectWithValue }) => {
		const { token } = postData;

		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/post/saved`,
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
