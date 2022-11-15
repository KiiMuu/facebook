import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { register, login } from './api';

let currentUser = Cookies.get('fb_user')
	? JSON.parse(Cookies.get('fb_user') as string)
	: null;

interface SliceState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	errors: any;
	successMsg?: string;
	user: UserInfo | null;
}

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		status: 'idle',
		errors: [],
		successMsg: '',
		user: currentUser,
	} as SliceState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(register.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(register.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
				state.successMsg = action.payload.message;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.status = 'failed';
				state.errors = action.payload;
			})
			.addCase(login.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.errors = action.payload;
			});
	},
});

// export const { onLogout } = userSlice.actions;
export default userSlice.reducer;
