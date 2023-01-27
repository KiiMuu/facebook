import { useState, useRef, useCallback, useEffect } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { toast } from 'react-hot-toast';
import getCroppedImg from 'src/helpers/croppedImage';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import { ICloudImage } from 'src/interfaces/post';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { createPost, uploadImages } from 'src/state/post/api';
import { updateCoverPhoto } from 'src/state/user/api';
import { Public } from 'src/svg';
import classes from '../../pages/profile/profile.module.scss';

const Cover: React.FC<{
	cover?: string;
	username?: string;
	isVisitor: boolean;
}> = ({ cover, username, isVisitor }) => {
	const [showCoverMenu, setShowCoverMenu] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [coverPhotoWidth, setCoverPhotoWidth] = useState<number>(0);
	const [coverPhoto, setCoverPhoto] = useState<
		string | ArrayBuffer | null | undefined
	>();
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
	const menuRef = useRef(null);
	const coverRef = useRef<HTMLDivElement | null>(null);
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.user);
	const allowedFiles = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

	useDetectOutsideClicks(menuRef, () => setShowCoverMenu(false));

	useEffect(() => {
		setCoverPhotoWidth(coverRef.current!?.clientWidth);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [window.innerWidth]);

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
				setCoverPhoto(readerEvent.target?.result);
			};
		}
	};

	const onCropComplete = useCallback(
		(croppedArea: Area, croppedAreaPixels: Area) => {
			setCroppedAreaPixels(croppedAreaPixels);
		},
		[]
	);

	const getCroppedArea = useCallback(
		async (show?: string) => {
			try {
				const img: any = await getCroppedImg(
					coverPhoto,
					croppedAreaPixels
				);

				if (show) {
					setCoverPhoto(img);
					setZoom(1);
					setCrop({ x: 0, y: 0 });
				} else {
					return img;
				}
			} catch (error) {
				toast.error(error.message);
			}
		},
		[croppedAreaPixels, coverPhoto, setCoverPhoto]
	);

	const handleUpdateCover = async () => {
		const toastId = toast.loading(
			'Please wait while your cover photo is being updated...',
			{ position: 'bottom-left' }
		);
		setIsLoading(true);

		try {
			const img = await getCroppedArea();
			const blob = await fetch(img).then(b => b.blob());
			const path = `${user?.username}/cover_photos`;
			const formData = new FormData();

			formData.append('file', blob);
			formData.append('path', path);

			const uploadedCover: ICloudImage[] = await dispatch(
				uploadImages({ formData, token: user?.token })
			).unwrap();

			const updatedCoverRes = await dispatch(
				updateCoverPhoto({
					token: user?.token,
					url: uploadedCover[0]?.url,
				})
			);

			if (updatedCoverRes.meta.requestStatus === 'fulfilled') {
				dispatch(
					createPost({
						background: null,
						type: 'cover',
						text: null,
						images: uploadedCover,
						user,
						token: user?.token,
					})
				).then(() => {
					setCoverPhoto(null);
					setIsLoading(false);
				});

				toast.dismiss(toastId);
				toast.success('Cover photo updated successfully.', {
					duration: 5000,
				});
			}
		} catch (error) {
			toast.dismiss(toastId);
			setIsLoading(false);
			toast.error(error.message);
		}
	};

	const {
		profile_cover,
		update_cover_wrapper,
		open_cover_update,
		open_cover_menu,
		open_cover_menu_item,
		cover_cropper,
		save_changes_cover,
		right,
		left,
		coverP,
	} = classes;

	return (
		<div className={profile_cover} ref={coverRef}>
			{coverPhoto && (
				<div className={save_changes_cover}>
					<div className={left}>
						<Public color='#828387' />
						<span>Your cover photo is public.</span>
					</div>
					<div className={right}>
						<button
							className='blue_btn'
							onClick={() => setCoverPhoto(null)}
							style={{
								cursor: isLoading ? 'wait' : 'pointer',
								opacity: isLoading ? 0.5 : 1,
							}}
						>
							Cancel
						</button>
						<button
							className='blue_btn'
							onClick={() => handleUpdateCover()}
							disabled={isLoading}
							style={{
								cursor: isLoading ? 'wait' : 'pointer',
								opacity: isLoading ? 0.5 : 1,
							}}
						>
							{isLoading ? 'Saving...' : 'Save Changes'}
						</button>
					</div>
				</div>
			)}
			<input
				type='file'
				ref={inputFileRef}
				hidden
				accept='image/*'
				onChange={handleFileChange}
			/>
			{coverPhoto && (
				<div className={cover_cropper}>
					<Cropper
						image={coverPhoto as string}
						crop={crop}
						zoom={zoom}
						aspect={coverPhotoWidth / 350}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
						showGrid={true}
						objectFit='horizontal-cover'
						style={{
							cropAreaStyle: {
								color: 'rgba(255, 255, 255, 0.5)',
								border: '1px solid rgba(0, 0, 0, 0.08)',
							},
						}}
					/>
				</div>
			)}
			{cover && <img src={cover} alt={username} className={coverP} />}
			{!isVisitor && (
				<div className={update_cover_wrapper}>
					<div
						className={open_cover_update}
						onClick={() => setShowCoverMenu(prev => !prev)}
					>
						<i className='camera_filled_icon'></i>
						<span>Add Cover Photo</span>
					</div>
					{showCoverMenu && (
						<div className={open_cover_menu} ref={menuRef}>
							<div
								className={`${open_cover_menu_item} hover1`}
								onClick={() => setShowCoverMenu(prev => !prev)}
							>
								<i className='photo_icon'></i>
								<span>Select Photo</span>
							</div>
							<div
								className={`${open_cover_menu_item} hover1`}
								onClick={() => {
									inputFileRef.current?.click();
									setShowCoverMenu(prev => !prev);
								}}
							>
								<i className='upload_icon'></i>
								<span>Upload Photo</span>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Cover;
