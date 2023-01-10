import { useState, useRef } from 'react';
import { PulseLoader } from 'react-spinners';
import EmojiPickerBackground from 'src/components/partials/EmojiPickerBackground';
import ImagePreview from 'src/components/partials/ImagePreview';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { createPost, uploadImages } from 'src/state/post/api';
import AddToYourPost from './AddToYourPost';
import PostError from './PostError';
import classes from './popup.module.scss';
import dataURItoBlob from 'src/helpers/dataUrlToBlob';

const PostPopup: React.FC<{
	user: UserInfo | null;
	setPostPopupVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ user, setPostPopupVisibility }) => {
	const [text, setText] = useState('');
	const [showPrev, setShowPrev] = useState(false);
	const [background, setBackground] = useState('');
	const [localError, setLocalError] = useState('');
	const [images, setImages] = useState<
		(string | ArrayBuffer | null | undefined)[]
	>([]);
	const popupRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const { status } = useAppSelector(state => state.post);

	useDetectOutsideClicks(popupRef, () => {
		setPostPopupVisibility(prev => !prev);
	});

	const handlePostCreate = async () => {
		try {
			if (background) {
				const res = await dispatch(
					createPost({
						background,
						type: null,
						text,
						images: null,
						user: user?.id,
						token: user?.token,
					})
				).unwrap();

				if (res) {
					setBackground('');
					setText('');
					setPostPopupVisibility(false);
				}
			} else if (images.length) {
				const postImages = images.map(img => {
					return dataURItoBlob(img);
				});

				const path = `${user?.username}/post/images`;
				const formData = new FormData();

				formData.append('path', path);
				postImages?.forEach(img => {
					formData.append('file', img);
				});

				const res = await dispatch(
					uploadImages({ formData, token: user?.token })
				).unwrap();

				const bgPost = await dispatch(
					createPost({
						background: null,
						type: null,
						text,
						images: res,
						user: user?.id,
						token: user?.token,
					})
				).unwrap();

				if (bgPost && res) {
					setBackground('');
					setText('');
					setPostPopupVisibility(false);
				}
			} else if (text) {
				const res = await dispatch(
					createPost({
						background: null,
						type: null,
						text,
						images: null,
						user: user?.id,
						token: user?.token,
					})
				).unwrap();

				if (res) {
					setBackground('');
					setText('');
					setPostPopupVisibility(false);
				}
			}
		} catch (error) {
			setLocalError(error.message);
		}
	};

	const {
		post_box,
		box_header,
		small_circle1,
		box_profile,
		box_profile_img,
		box_col,
		box_profile_name,
		box_privacy,
		post_submit,
	} = classes;

	return (
		<div className='blur'>
			<div className={`${post_box} scrollbar`} ref={popupRef}>
				{localError && (
					<PostError
						localError={localError}
						setLocalError={setLocalError}
					/>
				)}
				<div className={box_header}>
					<div
						className={`small_circle ${small_circle1}`}
						onClick={() => setPostPopupVisibility(prev => !prev)}
					>
						<i className='exit_icon'></i>
					</div>
					<span>Create Post</span>
				</div>
				<div className={box_profile}>
					<img
						src={user?.picture}
						alt={user?.username}
						className={box_profile_img}
					/>
					<div className={box_col}>
						<div className={box_profile_name}>
							{user?.firstName} {user?.lastName}
						</div>
						<div className={box_privacy}>
							<img src='/icons/public.png' alt='Public' />
							<span>Public</span>
							<i className='arrowDown_icon'></i>
						</div>
					</div>
				</div>
				{!showPrev ? (
					<EmojiPickerBackground
						firstName={user?.firstName}
						text={text}
						setText={setText}
						showPrev={showPrev}
						background={background}
						setBackground={setBackground}
					/>
				) : (
					<ImagePreview
						firstName={user?.firstName}
						text={text}
						setText={setText}
						showPrev={showPrev}
						images={images}
						setImages={setImages}
						setShowPrev={setShowPrev}
						setLocalError={setLocalError}
					/>
				)}
				<AddToYourPost setShowPrev={setShowPrev} />
				<button
					type='submit'
					className={post_submit}
					onClick={handlePostCreate}
					disabled={status === 'loading'}
				>
					{status === 'loading' ? (
						<PulseLoader color='#fff' size={8} />
					) : (
						'Post'
					)}
				</button>
			</div>
		</div>
	);
};

export default PostPopup;
