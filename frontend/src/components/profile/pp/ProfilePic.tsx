import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import { useAppSelector } from 'src/state/hooks';
import classes from './pp.module.scss';
import UpdatePP from './UpdatePP';

const ProfilePic: React.FC<{ setIsVisiblePP: (state: boolean) => void }> = ({
	setIsVisiblePP,
}) => {
	const [image, setImage] = useState<
		string | ArrayBuffer | null | undefined
	>();
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const popupRef = useRef(null);
	const allowedFiles = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
	const { photos } = useAppSelector(state => state.photos);
	const { user } = useAppSelector(state => state.user);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			if (!allowedFiles.includes(file.type)) {
				toast.error(
					`${file.name} format is not allowed. Only jpeg, png, gif or webp are allowed`,
					{
						duration: 5000,
						position: 'bottom-left',
					}
				);
				return;
			}

			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = readerEvent => {
				setImage(readerEvent.target?.result);
			};
		}
	};

	useDetectOutsideClicks(popupRef, () => setIsVisiblePP(false));

	const renderOldProfilePictures = () => {
		return photos.resources
			.filter(
				photo => photo.folder === `${user?.username}/profile_pictures`
			)
			.map(photo => (
				<img
					key={photo.public_id}
					src={photo.secure_url}
					alt={photo.secure_url}
					loading='lazy'
					onClick={() => setImage(photo.secure_url)}
				/>
			));
	};

	const renderOldOtherPictures = () => {
		return photos.resources
			.filter(
				photo => photo.folder !== `${user?.username}/profile_pictures`
			)
			.map(photo => (
				<img
					key={photo.public_id}
					src={photo.secure_url}
					alt={photo.secure_url}
					loading='lazy'
					onClick={() => setImage(photo.secure_url)}
				/>
			));
	};

	const {
		post_box,
		box_header,
		picBox,
		update_profile_wrap,
		small_circle1,
		update_picture_buttons,
		old_pictures_wrap,
		heading,
	} = classes;

	return (
		<div className='blur'>
			<div ref={popupRef}>
				<input
					type='file'
					hidden
					ref={inputFileRef}
					accept='image/*'
					onChange={handleFileChange}
				/>
				<div className={`${post_box} ${picBox} scrollbar`}>
					<div className={box_header}>
						<div
							className={`small_circle ${small_circle1}`}
							onClick={() => setIsVisiblePP(false)}
						>
							<i className='exit_icon'></i>
						</div>
						<span>Update Profile Picture</span>
					</div>
					<div className={update_profile_wrap}>
						<div className={update_picture_buttons}>
							<button
								className='light_blue_btn'
								onClick={() => inputFileRef.current?.click()}
							>
								<i className='plus_icon filter_blue'></i>
								<span>Update Photo</span>
							</button>
							<button className='gray_btn'>
								<i className='frame_icon'></i>
								<span>Add Frame</span>
							</button>
						</div>
					</div>
					<div className={old_pictures_wrap}>
						<div className={heading}>
							<h3>Profile Pictures</h3>
							<p>
								A history from your uploaded profile pictures.
							</p>
						</div>
						{renderOldProfilePictures()}
					</div>
					<div className={old_pictures_wrap}>
						<div className={heading}>
							<h3>Other Pictures</h3>
							<p>A history from your uploaded pictures.</p>
						</div>
						{renderOldOtherPictures()}
					</div>
				</div>
				{image && (
					<UpdatePP
						setIsVisiblePP={setIsVisiblePP}
						setImage={setImage}
						image={image}
					/>
				)}
			</div>
		</div>
	);
};

export default ProfilePic;
