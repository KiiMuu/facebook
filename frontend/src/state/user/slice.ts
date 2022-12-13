import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { SliceState } from 'src/interfaces/user';
import { register, login, verifyAccount, resendVerificationCode } from './api';

let currentUser = Cookies.get('fb_user')
	? JSON.parse(Cookies.get('fb_user') as string)
	: null;

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		status: 'idle',
		errors: [],
		successMsg: '',
		errorMsg: '',
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
			})
			.addCase(verifyAccount.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(verifyAccount.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
				state.user!.verified = true;
				state.successMsg = action.payload.message;
			})
			.addCase(verifyAccount.rejected, (state, action: any) => {
				state.status = 'failed';
				state.errorMsg = action.payload.message;
			})
			.addCase(resendVerificationCode.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(resendVerificationCode.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
				state.successMsg = action.payload.message;
			})
			.addCase(resendVerificationCode.rejected, (state, action: any) => {
				state.status = 'failed';
				state.errorMsg = action.payload.message;
			});
	},
});

// export const { onLogout } = userSlice.actions;
export default userSlice.reducer;
