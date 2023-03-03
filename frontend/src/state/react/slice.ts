import { createSlice } from '@reduxjs/toolkit';
import { SliceState } from 'src/interfaces/react';
import { reactOnPost, getPostReacts } from './api';

export const reactSlice = createSlice({
	name: 'react',
	initialState: {
		reactStatus: 'idle',
		postReacts: [],
		reactedByMeType: null,
	} as SliceState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(reactOnPost.pending, (state, action) => {
				state.reactStatus = 'loading';
			})
			.addCase(reactOnPost.fulfilled, (state, action) => {
				state.reactStatus = 'succeeded';
			})
			.addCase(reactOnPost.rejected, (state, action) => {
				state.reactStatus = 'failed';
			})
			.addCase(getPostReacts.pending, (state, action) => {
				state.reactStatus = 'loading';
			})
			.addCase(getPostReacts.fulfilled, (state, action) => {
				state.reactStatus = 'succeeded';
				state.postReacts = action.payload.reacts;
				state.reactedByMeType = action.payload.reactedByMeType;
			})
			.addCase(getPostReacts.rejected, (state, action) => {
				state.reactStatus = 'failed';
			});
	},
});

export default reactSlice.reducer;
