import { useAppSelector } from 'src/state/hooks';
import classes from 'src/pages/profile/profile.module.scss';

const Photos: React.FC<{ username?: string }> = ({ username }) => {
	const { photos } = useAppSelector(state => state.photos);

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
				<span>Photos</span>
				<div className={profile_header_link}>See All Photos</div>
			</div>
			<div className={profile_card_count}>
				{photos.total_count === 0
					? null
					: photos.total_count === 1
					? '1 photo'
					: `${photos.total_count} of photos`}
			</div>
			<div className={profile_card_grid}>
				{photos.resources.slice(0, 9).map(photo => (
					<div className={profile_photo_card} key={photo.public_id}>
						<img
							src={photo.secure_url}
							alt={photo.public_id}
							loading='lazy'
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Photos;
