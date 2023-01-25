import { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import { toast } from 'react-hot-toast';
import getCroppedImg from 'src/helpers/croppedImage';
import { ICloudImage } from 'src/interfaces/post';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { uploadImages, createPost } from 'src/state/post/api';
import { updateProfilePic } from 'src/state/user/api';
import classes from './pp.module.scss';

const UpdatePP: React.FC<{
	image: string | ArrayBuffer | null | undefined;
	setImage: (state: string | ArrayBuffer | null | undefined) => void;
	setIsVisiblePP: (state: boolean) => void;
}> = ({ image, setImage, setIsVisiblePP }) => {
	const [description, setDescription] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
	const sliderRef = useRef<HTMLInputElement | null>(null);
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.user);

	const onCropComplete = useCallback(
		(croppedArea: Area, croppedAreaPixels: Area) => {
			setCroppedAreaPixels(croppedAreaPixels);
		},
		[]
	);

	const zoomIn = () => {
		sliderRef.current?.stepUp();

		setZoom(sliderRef.current?.valueAsNumber!);
	};

	const zoomOut = () => {
		sliderRef.current?.stepDown();

		setZoom(sliderRef.current?.valueAsNumber!);
	};

	const getCroppedArea = useCallback(
		async (show?: string) => {
			try {
				const img: any = await getCroppedImg(image, croppedAreaPixels);

				if (show) {
					setImage(img);
					setZoom(1);
					setCrop({ x: 0, y: 0 });
				} else {
					return img;
				}
			} catch (error) {
				toast.error(error.message);
			}
		},
		[croppedAreaPixels, image, setImage]
	);

	const handleUpdatePP = async () => {
		const toastId = toast.loading(
			'Please wait while your profile picture is being updated...',
			{ position: 'bottom-left' }
		);
		setIsLoading(true);

		try {
			const img = await getCroppedArea();
			const blob = await fetch(img).then(b => b.blob());
			const path = `${user?.username}/profile_pictures`;
			const formData = new FormData();

			formData.append('file', blob);
			formData.append('path', path);

			const uploadedPic: ICloudImage[] = await dispatch(
				uploadImages({ formData, token: user?.token })
			).unwrap();

			const updatedPicRes = await dispatch(
				updateProfilePic({
					token: user?.token,
					url: uploadedPic[0]?.url,
				})
			);

			if (updatedPicRes.meta.requestStatus === 'fulfilled') {
				dispatch(
					createPost({
						background: null,
						type: 'profilePicture',
						text: description,
						images: uploadedPic,
						user,
						token: user?.token,
					})
				).then(() => {
					setImage(null);
					setIsVisiblePP(false);
					setIsLoading(false);
				});

				toast.dismiss(toastId);
				toast.success('Profile picture updated successfully.', {
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
		post_box,
		box_header,
		update_img,
		small_circle1,
		update_image_desc,
		textarea_blue,
		details_input,
		update_center,
		cropper,
		slider,
		slider_circle,
		flex_up,
		flex_p_t,
		actions,
		blue_link,
		update_submit_wrap,
	} = classes;

	return (
		<div className={`${post_box} ${update_img}`}>
			<div className={box_header}>
				<div
					className={`small_circle ${small_circle1}`}
					onClick={() => setImage(null)}
				>
					<i className='exit_icon'></i>
				</div>
				<span>Update Profile Picture</span>
			</div>
			<div className={update_image_desc}>
				<textarea
					placeholder='Say something about your new profile picture'
					value={description}
					onChange={e => setDescription(e.target.value)}
					className={`${textarea_blue} ${details_input}`}
				></textarea>
			</div>
			<div className={update_center}>
				<div className={cropper}>
					<Cropper
						image={image as string}
						crop={crop}
						zoom={zoom}
						aspect={1 / 1}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
						showGrid={false}
						cropShape={'round'}
						style={{
							cropAreaStyle: {
								color: 'rgba(255, 255, 255, 0.5)',
								border: '1px solid rgba(0, 0, 0, 0.08)',
							},
						}}
					/>
				</div>
				<div className={slider}>
					<div className={slider_circle} onClick={() => zoomOut()}>
						<i className='minus_icon filter_blue'></i>
					</div>
					<input
						type='range'
						min={1}
						max={3}
						step={0.2}
						value={zoom}
						ref={sliderRef}
						onChange={e => setZoom(e.target.valueAsNumber)}
					/>
					<div className={slider_circle} onClick={() => zoomIn()}>
						<i className='plus_icon filter_blue'></i>
					</div>
				</div>
				<div className={flex_up}>
					<div
						className='gray_btn'
						onClick={() => getCroppedArea('show')}
						style={{
							cursor: isLoading ? 'wait' : 'auto',
							opacity: isLoading ? 0.5 : 1,
						}}
					>
						<i className='crop_icon'></i>
						<span>Crop Photo</span>
					</div>
					<div
						className='gray_btn'
						style={{
							cursor: isLoading ? 'wait' : 'auto',
							opacity: isLoading ? 0.5 : 1,
						}}
					>
						<i className='temp_icon'></i>
						<span>Make Temporary</span>
					</div>
				</div>
				<div className={update_submit_wrap}>
					<div className={flex_p_t}>
						<i className='public_icon'></i>
						<span>You profile picture set to public.</span>
					</div>
					<div className={actions}>
						<div
							className={blue_link}
							onClick={() => setImage(null)}
							style={{
								cursor: isLoading ? 'wait' : 'pointer',
								opacity: isLoading ? 0.5 : 1,
							}}
						>
							Cancel
						</div>
						<button
							className='blue_btn'
							disabled={isLoading}
							style={{
								cursor: isLoading ? 'wait' : 'pointer',
								opacity: isLoading ? 0.5 : 1,
							}}
							onClick={() => handleUpdatePP()}
						>
							{isLoading ? 'Saving...' : 'Save'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdatePP;
