import classes from 'src/pages/profile/profile.module.scss';

const Friends: React.FC<{ friends?: IPublicUser[] }> = ({ friends }) => {
	const {
		profile_card,
		profile_card_header,
		profile_header_link,
		profile_card_count,
		profile_card_grid,
		profile_photo_card,
	} = classes;

	return (
		<div className={profile_card}>
			<div className={profile_card_header}>
				<span>Friends</span>
				<div className={profile_header_link}>See All Friends</div>
			</div>
			{friends?.length ? (
				<div className={profile_card_count}>
					{friends?.length === 1
						? '1 friend'
						: `${friends?.length} of friends`}
				</div>
			) : null}
			<div className={profile_card_grid}>
				{friends?.slice(0, 9).map(friend => (
					<div key={friend._id} className={profile_photo_card}>
						{friend.username}
					</div>
				))}
			</div>
		</div>
	);
};

export default Friends;
