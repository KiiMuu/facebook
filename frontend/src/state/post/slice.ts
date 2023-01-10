import { createSlice } from '@reduxjs/toolkit';
import { SliceState } from 'src/interfaces/post';
import { createPost, uploadImages } from './api';

export const postSlice = createSlice({
	name: 'post',
	initialState: {
		status: 'idle',
		error: '',
		successMsg: '',
		errorMsg: '',
		createdPost: {},
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
			});
	},
});

export default postSlice.reducer;
