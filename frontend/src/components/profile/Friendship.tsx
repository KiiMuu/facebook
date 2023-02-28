import { useState, useRef } from 'react';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import { useAppSelector } from 'src/state/hooks';
import classes from '../../pages/profile/profile.module.scss';

const Friendship = () => {
	const [isFriendsMenuVisible, setIsFriendsMenuVisible] = useState(false);
	const [isRespondMenuVisible, setIsRespondMenuVisible] = useState(false);
	const friendsMenuRef = useRef(null);
	const { profile } = useAppSelector(state => state.user);

	useDetectOutsideClicks(friendsMenuRef, () => {
		setIsFriendsMenuVisible(false);
		setIsRespondMenuVisible(false);
	});

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
								>
									<img
										src='/icons/unfollowOutlined.png'
										alt='Follow'
									/>
									<span>Follow</span>
								</div>
							)}
							<div className={`${open_cover_menu_item} hover1`}>
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
						onClick={() => setIsFriendsMenuVisible(prev => !prev)}
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
					onClick={() => setIsFriendsMenuVisible(prev => !prev)}
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
								>
									<img
										src='/icons/addFriend.png'
										alt='add friend'
									/>
									<span>Confirm Request</span>
								</div>
								<div
									className={`${open_cover_menu_item} hover1`}
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
				<button className='gray_btn'>
					<img src='/icons/follow.png' alt='follow' />
					<span>Following</span>
				</button>
			) : (
				<button className='blue_btn'>
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
