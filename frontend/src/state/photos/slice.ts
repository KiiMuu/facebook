import { createSlice } from '@reduxjs/toolkit';
import { SliceState } from 'src/interfaces/photos';
import { getPhotos } from './api';

export const photosSlice = createSlice({
	name: 'post',
	initialState: {
		status: 'idle',
		error: '',
		successMsg: '',
		errorMsg: '',
		photos: {
			resources: [],
			total_count: 0,
		},
	} as SliceState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getPhotos.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getPhotos.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.photos = action.payload;
			})
			.addCase(getPhotos.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export default photosSlice.reducer;
