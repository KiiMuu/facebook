import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { SliceState } from 'src/interfaces/user';
import {
	register,
	login,
	verifyAccount,
	resendVerificationCode,
	findUser,
	sendResetPasswordEmail,
	validateResetCode,
	changePassword,
	getUserProfile,
} from './api';

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
		profileNotFoundMsg: '',
		foundUser: null,
		user: currentUser,
		profile: null,
	} as SliceState,
	reducers: {
		logoutUser: state => {
			state.user = null;
			Cookies.remove('fb_user');
		},
	},
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
			})
			.addCase(findUser.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(findUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.errors = [];
				state.foundUser = action.payload;
			})
			.addCase(findUser.rejected, (state, action: any) => {
				state.status = 'failed';
				state.errorMsg = action.payload.message;
			})
			.addCase(sendResetPasswordEmail.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(sendResetPasswordEmail.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.successMsg = action.payload;
			})
			.addCase(sendResetPasswordEmail.rejected, (state, action: any) => {
				state.status = 'failed';
				state.errorMsg = action.payload.message;
			})
			.addCase(validateResetCode.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(validateResetCode.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.successMsg = action.payload;
			})
			.addCase(validateResetCode.rejected, (state, action: any) => {
				state.status = 'failed';
				state.errorMsg = action.payload.message;
			})
			.addCase(changePassword.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(changePassword.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.successMsg = action.payload;
			})
			.addCase(changePassword.rejected, (state, action: any) => {
				state.status = 'failed';
				state.errorMsg = action.payload.message;
			})
			.addCase(getUserProfile.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getUserProfile.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.profile = action.payload;
			})
			.addCase(getUserProfile.rejected, (state, action: any) => {
				state.status = 'failed';
				state.profileNotFoundMsg = action.payload.message;
			});
	},
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
