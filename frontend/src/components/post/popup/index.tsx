import { useState, useRef } from 'react';
import EmojiPickerBackground from 'src/components/partials/EmojiPickerBackground';
import ImagePreview from 'src/components/partials/ImagePreview';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import AddToYourPost from './AddToYourPost';
import classes from './popup.module.scss';

const PostPopup: React.FC<{
	user: UserInfo | null;
	setPostPopupVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ user, setPostPopupVisibility }) => {
	const [text, setText] = useState('');
	const [showPrev, setShowPrev] = useState(false);
	const [background, setBackground] = useState('');
	const [images, setImages] = useState<
		(string | ArrayBuffer | null | undefined)[]
	>([]);
	const popupRef = useRef<HTMLDivElement>(null);

	useDetectOutsideClicks(popupRef, () => {
		setPostPopupVisibility(prev => !prev);
	});

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
					/>
				)}
				<AddToYourPost setShowPrev={setShowPrev} />
				<button type='submit' className={post_submit}>
					Post
				</button>
			</div>
		</div>
	);
};

export default PostPopup;
