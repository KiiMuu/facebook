import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFilterImage } from 'src/interfaces/photos';

export const getPhotos = createAsyncThunk(
	'/cloudinary/images',
	async (photosData: IFilterImage, { rejectWithValue }) => {
		const { path, sort, max, token } = photosData;

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/cloudinary/images/list`,
				{ path, sort, max },
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
