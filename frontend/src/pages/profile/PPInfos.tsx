import classes from './profile.module.scss';

const ProfilePictureInfos: React.FC<{ profile: IProfile | null }> = ({
	profile,
}) => {
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
			<div className={profile_w_left}>
				<div className={profile_w_img}>
					<div
						className={profile_w_bg}
						style={{
							backgroundSize: 'cover',
							backgroundImage: `url(${profile?.picture})`,
						}}
					></div>
					<div className={`${profile_circle} hover1`}>
						<i className='camera_filled_icon'></i>
					</div>
				</div>
				<div className={profile_w_col}>
					<div className={profile_name}>
						{profile?.firstName} {profile?.lastName}
						<div className={other_name}>Othename</div>
					</div>
					<div className={friends_count}></div>
					<div className={friends_imgs}></div>
				</div>
			</div>
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
		</div>
	);
};

export default ProfilePictureInfos;
