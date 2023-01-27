import { useRef } from 'react';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import { useAppSelector } from 'src/state/hooks';
import classes from './pp/pp.module.scss';

const OldCoverPhotos: React.FC<{
	setOldCoverPhotos: (state: boolean) => void;
	setCoverPhoto: (state: string | ArrayBuffer | null | undefined) => void;
}> = ({ setOldCoverPhotos, setCoverPhoto }) => {
	const { user } = useAppSelector(state => state.user);
	const { photos } = useAppSelector(state => state.photos);
	const oldCoverRef = useRef(null);

	useDetectOutsideClicks(oldCoverRef, () => setOldCoverPhotos(false));

	const renderOldCoverPhotos = () => {
		return photos.resources
			.filter(photo => photo.folder === `${user?.username}/cover_photos`)
			.map(photo => (
				<img
					key={photo.public_id}
					src={photo.secure_url}
					alt={photo.secure_url}
					loading='lazy'
					onClick={() => {
						setOldCoverPhotos(false);
						setCoverPhoto(photo.secure_url);
					}}
				/>
			));
	};

	const {
		post_box,
		box_header,
		selectCoverBox,
		small_circle1,
		slectCoverBox_links,
		slectCoverBox_link,
		old_cover_photos_wrap,
	} = classes;

	return (
		<div className='blur'>
			<div
				className={`${post_box} ${selectCoverBox} scrollbar`}
				ref={oldCoverRef}
			>
				<div className={box_header}>
					<div
						className={`small_circle ${small_circle1}`}
						onClick={() => setOldCoverPhotos(false)}
					>
						<i className='exit_icon'></i>
					</div>
					<span>Select Cover Photo</span>
				</div>
				<div className={slectCoverBox_links}>
					<div className={slectCoverBox_link}>Recent Photos</div>
					<div className={slectCoverBox_link}>Photo Albums</div>
				</div>
				<div className={old_cover_photos_wrap}>
					{renderOldCoverPhotos()}
				</div>
			</div>
		</div>
	);
};

export default OldCoverPhotos;
