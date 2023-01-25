import { createSlice } from '@reduxjs/toolkit';
import { SliceState } from 'src/interfaces/photos';
import { getPhotos } from './api';

export const photosSlice = createSlice({
	name: 'post',
	initialState: {
		fetchPhotosStatus: 'idle',
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
				state.fetchPhotosStatus = 'loading';
			})
			.addCase(getPhotos.fulfilled, (state, action) => {
				state.fetchPhotosStatus = 'succeeded';
				state.error = '';
				state.photos = action.payload;
			})
			.addCase(getPhotos.rejected, (state, action) => {
				state.fetchPhotosStatus = 'failed';
				state.error = action.payload;
			});
	},
});

export default photosSlice.reducer;
