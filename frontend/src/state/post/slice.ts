import { createSlice } from '@reduxjs/toolkit';
import { SliceState } from 'src/interfaces/post';
import { createPost, getAllPosts, uploadImages } from './api';

export const postSlice = createSlice({
	name: 'post',
	initialState: {
		status: 'idle',
		error: '',
		successMsg: '',
		errorMsg: '',
		createdPost: {
			type: null,
			background: null,
			text: null,
			images: null,
			user: null,
			token: undefined,
			createdAt: undefined,
			updatedAt: undefined,
		},
		posts: [],
	} as SliceState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(createPost.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.createdPost = action.payload;
				state.posts = [action.payload, ...state.posts];
			})
			.addCase(createPost.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(uploadImages.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(uploadImages.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
			})
			.addCase(uploadImages.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(getAllPosts.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getAllPosts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.posts = action.payload;
			})
			.addCase(getAllPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export default postSlice.reducer;
