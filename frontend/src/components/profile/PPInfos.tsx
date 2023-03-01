import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from '../../pages/profile/profile.module.scss';
import Friendship from './Friendship';
import ProfilePic from './pp/ProfilePic';

const ProfilePictureInfos: React.FC<{
	profile: IProfile | null;
	isVisitor: boolean;
}> = ({ profile, isVisitor }) => {
	const [isVisiblePP, setIsVisiblePP] = useState(false);

	const {
		profile_img_wrap,
		profile_w_left,
		profile_w_img,
		profile_w_bg,
		profile_circle,
		profile_w_col,
		profile_name,
		other_name,
		friends_count,
		friends_imgs,
		profile_w_right,
		invert,
	} = classes;

	return (
		<div className={profile_img_wrap}>
			{isVisiblePP && <ProfilePic setIsVisiblePP={setIsVisiblePP} />}
			<div className={profile_w_left}>
				<div className={profile_w_img}>
					<div
						className={profile_w_bg}
						style={{
							backgroundSize: 'cover',
							backgroundImage: `url(${profile?.picture})`,
						}}
					></div>
					{!isVisitor && (
						<div
							className={`${profile_circle} hover1`}
							onClick={() => setIsVisiblePP(prev => !prev)}
						>
							<i className='camera_filled_icon'></i>
						</div>
					)}
				</div>
				<div className={profile_w_col}>
					<div className={profile_name}>
						{profile?.firstName} {profile?.lastName}
						{profile?.details?.otherName && (
							<div className={other_name}>
								({profile?.details?.otherName})
							</div>
						)}
					</div>
					{profile?.friends?.length ? (
						<div className={friends_count}>
							has{' '}
							{profile?.friends?.length === 1
								? '(1) Friend'
								: `(${profile?.friends?.length}) of Friends`}
						</div>
					) : null}
					<div className={friends_imgs}>
						{profile?.friends?.slice(0, 9).map(friend => (
							<Link
								to={`/profile/${friend.username}`}
								key={friend._id}
							>
								<img
									src={friend.picture}
									alt={friend.username}
									title={friend.username}
								/>
							</Link>
						))}
					</div>
				</div>
			</div>
			{isVisitor ? (
				<Friendship />
			) : (
				<div className={profile_w_right}>
					<div className='blue_btn'>
						<img
							src='/icons/plus.png'
							alt='Add to story'
							className={invert}
						/>
						<span>Add to Story</span>
					</div>
					<div className='gray_btn'>
						<i className='edit_icon'></i>
						<span>Edit Profile</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfilePictureInfos;
