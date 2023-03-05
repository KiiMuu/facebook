import { createSlice } from '@reduxjs/toolkit';
import { SliceState } from 'src/interfaces/post';
import {
	createPost,
	createPostComment,
	getAllPosts,
	getSavedPosts,
	savePost,
	uploadImages,
} from './api';

export const postSlice = createSlice({
	name: 'post',
	initialState: {
		status: 'idle',
		postStatus: 'idle',
		commentStatus: 'idle',
		error: '',
		successMsg: '',
		errorMsg: '',
		isSavedPost: false,
		savePostStatus: 'idle',
		savedPostStatus: 'idle',
		savedPosts: [],
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
		postComments: [],
	} as SliceState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(createPost.pending, (state, action) => {
				state.postStatus = 'loading';
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.postStatus = 'succeeded';
				state.error = '';
				state.createdPost = action.payload;
				state.posts = [action.payload, ...state.posts];
			})
			.addCase(createPost.rejected, (state, action) => {
				state.postStatus = 'failed';
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
			})
			.addCase(createPostComment.pending, (state, action) => {
				state.commentStatus = 'loading';
			})
			.addCase(createPostComment.fulfilled, (state, action) => {
				state.commentStatus = 'succeeded';
				state.postComments = action.payload;
			})
			.addCase(createPostComment.rejected, (state, action) => {
				state.commentStatus = 'failed';
				state.error = action.payload;
			})
			.addCase(savePost.pending, (state, action) => {
				state.savePostStatus = 'loading';
			})
			.addCase(savePost.fulfilled, (state, action) => {
				state.savePostStatus = 'succeeded';
				state.isSavedPost = action.payload.isSavedPost;
			})
			.addCase(savePost.rejected, (state, action) => {
				state.savePostStatus = 'failed';
				state.error = action.payload;
			})
			.addCase(getSavedPosts.pending, (state, action) => {
				state.savedPostStatus = 'loading';
			})
			.addCase(getSavedPosts.fulfilled, (state, action) => {
				state.savedPostStatus = 'succeeded';
				state.savedPosts = action.payload;
			})
			.addCase(getSavedPosts.rejected, (state, action) => {
				state.savedPostStatus = 'failed';
				state.error = action.payload;
			});
	},
});

export default postSlice.reducer;
