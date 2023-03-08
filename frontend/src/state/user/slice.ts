import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { SliceState } from 'src/interfaces/user';
import { createPost, deletePost } from '../post/api';
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
	updateProfilePic,
	updateCoverPhoto,
	updateUserInfos,
	addFriendRequest,
	cancelFriendRequest,
	followRequest,
	unfollowRequest,
	acceptFriendRequest,
	unFriendRequest,
	deleteFriendRequest,
	searchFB,
	getSearchHistories,
	deleteFromSearchHistory,
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
		searchResults: [],
		searchStatus: 'idle',
		searchHistory: {
			search: [
				{
					user: null,
				},
			],
		},
		searchHistoryFetchStatus: 'idle',
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
			})
			.addCase(updateProfilePic.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(updateProfilePic.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user!.picture = action.payload.picture;
				state.profile!.picture = action.payload.picture;
			})
			.addCase(updateProfilePic.rejected, (state, action: any) => {
				state.status = 'failed';
				state.errorMsg = action.payload.message;
			})
			.addCase(updateCoverPhoto.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(updateCoverPhoto.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user!.cover = action.payload.cover;
				state.profile!.cover = action.payload.cover;
			})
			.addCase(updateCoverPhoto.rejected, (state, action: any) => {
				state.status = 'failed';
				state.errorMsg = action.payload.message;
			})
			.addCase(updateUserInfos.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(updateUserInfos.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.profile!.details = action.payload;
			})
			.addCase(updateUserInfos.rejected, (state, action: any) => {
				state.status = 'failed';
				state.errorMsg = action.payload.message;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				if (window.location.pathname.includes('/profile')) {
					state.profile!.posts = [
						action.payload,
						...state.profile!.posts,
					];
				}
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				if (window.location.pathname.includes('/profile')) {
					state.profile!.posts = state.profile!.posts.filter(
						post => post._id !== action.payload.postId
					);
				}
			})
			.addCase(addFriendRequest.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(addFriendRequest.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.profile!.friendship.isRequestSent = true;
				state.profile!.friendship.isFollowing = true;
			})
			.addCase(addFriendRequest.rejected, (state, action: any) => {
				state.status = 'failed';
			})
			.addCase(cancelFriendRequest.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(cancelFriendRequest.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.profile!.friendship.isRequestSent = false;
				state.profile!.friendship.isFollowing = false;
			})
			.addCase(cancelFriendRequest.rejected, (state, action: any) => {
				state.status = 'failed';
			})
			.addCase(followRequest.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(followRequest.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.profile!.friendship.isFollowing = true;
			})
			.addCase(followRequest.rejected, (state, action: any) => {
				state.status = 'failed';
			})
			.addCase(unfollowRequest.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(unfollowRequest.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.profile!.friendship.isFollowing = false;
			})
			.addCase(unfollowRequest.rejected, (state, action: any) => {
				state.status = 'failed';
			})
			.addCase(acceptFriendRequest.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(acceptFriendRequest.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.profile!.friendship.areFriends = true;
				state.profile!.friendship.isFollowing = true;
				state.profile!.friendship.isRequestSent = false;
				state.profile!.friendship.isRequestRecieved = false;
			})
			.addCase(acceptFriendRequest.rejected, (state, action: any) => {
				state.status = 'failed';
			})
			.addCase(unFriendRequest.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(unFriendRequest.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.profile!.friendship.areFriends = false;
				state.profile!.friendship.isFollowing = false;
				state.profile!.friendship.isRequestSent = false;
				state.profile!.friendship.isRequestRecieved = false;
			})
			.addCase(unFriendRequest.rejected, (state, action: any) => {
				state.status = 'failed';
			})
			.addCase(deleteFriendRequest.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(deleteFriendRequest.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.profile!.friendship.areFriends = false;
				state.profile!.friendship.isFollowing = false;
				state.profile!.friendship.isRequestSent = false;
				state.profile!.friendship.isRequestRecieved = false;
			})
			.addCase(deleteFriendRequest.rejected, (state, action: any) => {
				state.status = 'failed';
			})
			.addCase(searchFB.pending, (state, action) => {
				state.searchStatus = 'loading';
			})
			.addCase(searchFB.fulfilled, (state, action) => {
				state.searchStatus = 'succeeded';
				state.searchResults = action.payload;
			})
			.addCase(searchFB.rejected, (state, action: any) => {
				state.searchStatus = 'failed';
			})
			.addCase(getSearchHistories.pending, (state, action) => {
				state.searchHistoryFetchStatus = 'loading';
			})
			.addCase(getSearchHistories.fulfilled, (state, action) => {
				state.searchHistoryFetchStatus = 'succeeded';
				state.searchHistory = action.payload;
			})
			.addCase(getSearchHistories.rejected, (state, action: any) => {
				state.searchHistoryFetchStatus = 'failed';
			})
			.addCase(deleteFromSearchHistory.fulfilled, (state, action) => {
				state.searchHistoryFetchStatus = 'succeeded';
				state.searchHistory.search = state.searchHistory.search.filter(
					searchHistory =>
						searchHistory._id !== action.payload.deletedHistoryId
				);
			});
	},
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
