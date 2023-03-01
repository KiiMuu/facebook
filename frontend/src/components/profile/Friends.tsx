import { Link } from 'react-router-dom';
import classes from 'src/pages/profile/profile.module.scss';
import { useAppSelector } from 'src/state/hooks';

const Friends = () => {
	const { profile } = useAppSelector(state => state.user);

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
			{profile?.friends?.length ? (
				<div className={profile_card_count}>
					{profile?.friends?.length === 1
						? '1 Friend'
						: `${profile?.friends?.length} of Friends`}
				</div>
			) : null}
			<div className={profile_card_grid}>
				{profile?.friends?.slice(0, 9).map(friend => (
					<Link
						to={`/profile/${friend.username}`}
						key={friend._id}
						className={profile_photo_card}
					>
						<img src={friend.picture} alt={friend.username} />
						<span>
							{friend.firstName} {friend.lastName}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Friends;
