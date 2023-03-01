import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import {
	acceptFriendRequest,
	addFriendRequest,
	cancelFriendRequest,
	deleteFriendRequest,
	followRequest,
	unfollowRequest,
	unFriendRequest,
} from 'src/state/user/api';
import classes from '../../pages/profile/profile.module.scss';

const Friendship = () => {
	const [isFriendsMenuVisible, setIsFriendsMenuVisible] = useState(false);
	const [isRespondMenuVisible, setIsRespondMenuVisible] = useState(false);
	const friendsMenuRef = useRef(null);
	const dispatch = useAppDispatch();
	const { profile, user } = useAppSelector(state => state.user);

	useDetectOutsideClicks(friendsMenuRef, () => {
		setIsFriendsMenuVisible(false);
		setIsRespondMenuVisible(false);
	});

	const handleAddFriend = async () => {
		try {
			let res = await dispatch(
				addFriendRequest({ token: user?.token, userId: profile?._id })
			).unwrap();

			toast.success(res.message);
		} catch (error) {
			toast.success(error.message);
		}
	};

	const handleCancelFriend = async () => {
		try {
			let res = await dispatch(
				cancelFriendRequest({
					token: user?.token,
					userId: profile?._id,
				})
			).unwrap();

			toast.success(res.message);
		} catch (error) {
			toast.success(error.message);
		}
	};

	const handleFollow = async () => {
		try {
			let res = await dispatch(
				followRequest({
					token: user?.token,
					userId: profile?._id,
				})
			).unwrap();

			toast.success(res.message);
		} catch (error) {
			toast.success(error.message);
		}
	};

	const handleUnfollow = async () => {
		try {
			let res = await dispatch(
				unfollowRequest({
					token: user?.token,
					userId: profile?._id,
				})
			).unwrap();

			toast.success(res.message);
		} catch (error) {
			toast.success(error.message);
		}
	};

	const handleAcceptFriend = async () => {
		try {
			let res = await dispatch(
				acceptFriendRequest({
					token: user?.token,
					userId: profile?._id,
				})
			).unwrap();

			toast.success(res.message);
		} catch (error) {
			toast.success(error.message);
		}
	};

	const handleUnFriend = async () => {
		try {
			let res = await dispatch(
				unFriendRequest({
					token: user?.token,
					userId: profile?._id,
				})
			).unwrap();

			toast.success(res.message);
		} catch (error) {
			toast.success(error.message);
		}
	};

	const handleDeleteFriendRequest = async () => {
		try {
			let res = await dispatch(
				deleteFriendRequest({
					token: user?.token,
					userId: profile?._id,
				})
			).unwrap();

			toast.success(res.message);
		} catch (error) {
			toast.success(error.message);
		}
	};

	const {
		friendship_wrapper,
		update_cover_wrapper,
		open_cover_menu,
		open_cover_menu_item,
	} = classes;

	return (
		<div className={friendship_wrapper}>
			{profile?.friendship.areFriends ? (
				<div className={update_cover_wrapper}>
					<button
						className='gray_btn'
						onClick={() => setIsFriendsMenuVisible(prev => !prev)}
					>
						<img src='/icons/friends.png' alt='friends' />
						<span>Friends</span>
					</button>
					{isFriendsMenuVisible && (
						<div className={open_cover_menu} ref={friendsMenuRef}>
							<div className={`${open_cover_menu_item} hover1`}>
								<img
									src='/icons/favoritesOutline.png'
									alt='favorites'
								/>
								<span>Favorites</span>
							</div>
							<div className={`${open_cover_menu_item} hover1`}>
								<img
									src='/icons/editFriends.png'
									alt='edit friends'
								/>
								<span>Edit Friend List</span>
							</div>
							{profile?.friendship.isFollowing ? (
								<div
									className={`${open_cover_menu_item} hover1`}
									onClick={() => handleUnfollow()}
								>
									<img
										src='/icons/unfollowOutlined.png'
										alt='Unfollow'
									/>
									<span>Unfollow</span>
								</div>
							) : (
								<div
									className={`${open_cover_menu_item} hover1`}
									onClick={() => handleFollow()}
								>
									<img
										src='/icons/unfollowOutlined.png'
										alt='Follow'
									/>
									<span>Follow</span>
								</div>
							)}
							<div
								className={`${open_cover_menu_item} hover1`}
								onClick={() => handleUnFriend()}
							>
								<i className='unfriend_outlined_icon' />
								<span>Unfriend</span>
							</div>
						</div>
					)}
				</div>
			) : (
				!profile?.friendship.isRequestSent &&
				!profile?.friendship.isRequestRecieved && (
					<button
						className='blue_btn'
						onClick={() => handleAddFriend()}
					>
						<img
							src='/icons/addFriend.png'
							alt='friends'
							className='invert'
						/>
						<span>Add Friend</span>
					</button>
				)
			)}
			{profile?.friendship.isRequestSent ? (
				<button
					className='blue_btn'
					onClick={() => handleCancelFriend()}
				>
					<img
						src='/icons/cancelRequest.png'
						alt='friends'
						className='invert'
					/>
					<span>Cancel Request</span>
				</button>
			) : (
				profile?.friendship.isRequestRecieved && (
					<div className={update_cover_wrapper}>
						<button
							className='gray_btn'
							onClick={() =>
								setIsRespondMenuVisible(prev => !prev)
							}
						>
							<img src='/icons/friends.png' alt='friends' />
							<span>Respond</span>
						</button>
						{isRespondMenuVisible && (
							<div
								className={open_cover_menu}
								ref={friendsMenuRef}
							>
								<div
									className={`${open_cover_menu_item} hover1`}
									onClick={() => handleAcceptFriend()}
								>
									<img
										src='/icons/addFriend.png'
										alt='add friend'
									/>
									<span>Confirm Request</span>
								</div>
								<div
									className={`${open_cover_menu_item} hover1`}
									onClick={() => handleDeleteFriendRequest()}
								>
									<img
										src='/icons/cancelRequest.png'
										alt='cancel request'
									/>
									<span>Delete Request</span>
								</div>
							</div>
						)}
					</div>
				)
			)}
			{profile?.friendship.isFollowing ? (
				<button className='gray_btn' onClick={() => handleUnfollow()}>
					<img src='/icons/follow.png' alt='follow' />
					<span>Following</span>
				</button>
			) : (
				<button className='blue_btn' onClick={() => handleFollow()}>
					<img
						src='/icons/follow.png'
						alt='follow'
						className='invert'
					/>
					<span>Follow</span>
				</button>
			)}
			<button
				className={
					profile?.friendship.areFriends ? 'blue_btn' : 'gray_btn'
				}
			>
				<img
					src='/icons/message.png'
					alt='message'
					className={profile?.friendship.areFriends ? 'invert' : ''}
				/>
				<span>Message</span>
			</button>
		</div>
	);
};

export default Friendship;
