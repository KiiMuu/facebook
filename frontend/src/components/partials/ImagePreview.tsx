import { useRef } from 'react';
import EmojiPickerBackground from './EmojiPickerBackground';
import classes from '../post/popup/popup.module.scss';

const ImagePreview: React.FC<IImagePreview> = ({
	firstName,
	text,
	setText,
	images,
	setImages,
	setShowPrev,
}) => {
	const imageInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileChanghe = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const files = Array.from(e.target.files);

			if (files) {
				files.forEach(img => {
					const reader = new FileReader();

					reader.readAsDataURL(img as Blob);

					reader.onload = readerEvent => {
						setImages(images => [
							...images,
							readerEvent.target?.result,
						]);
					};
				});
			}
		}
	};

	const {
		overflow_a,
		add_pics_wrap,
		add_pics_inside,
		small_white_circle,
		add_col,
		add_circle,
		add_pics_inside2,
		mobile_text,
		add_phone_btn,
		p0,
		preview_actions,
		preview1,
		preview2,
		preview3,
		preview4,
		preview5,
		preview6,
		singular_grid,
	} = classes;

	return (
		<div className={`${overflow_a} scrollbar`}>
			<EmojiPickerBackground
				firstName={firstName}
				text={text}
				setText={setText}
				type2
			/>
			<div className={add_pics_wrap}>
				<input
					type='file'
					multiple
					hidden
					ref={imageInputRef}
					onChange={handleFileChanghe}
				/>
				{images?.length ? (
					<div className={`${add_pics_inside} ${p0}`}>
						<div className={preview_actions}>
							<button>
								<i className='edit_icon'></i>
								Edit
							</button>
							<button
								onClick={() => imageInputRef.current?.click()}
							>
								<i className='addPhoto_icon'></i>
								Add Photo/Videos
							</button>
						</div>
						<div
							className={small_white_circle}
							onClick={() => setImages([])}
						>
							<i className='exit_icon'></i>
						</div>
						<div
							className={
								images.length === 1
									? preview1
									: images.length === 2
									? preview2
									: images.length === 3
									? preview3
									: images.length === 4
									? preview4
									: images.length === 5
									? preview5
									: images.length % 2 === 0
									? preview6
									: `${preview6} ${singular_grid}`
							}
						>
							{images.map((img, i) => (
								<img
									key={i}
									src={img as string}
									alt='post media'
								/>
							))}
						</div>
					</div>
				) : (
					<div className={add_pics_inside}>
						<div
							className={small_white_circle}
							onClick={() => setShowPrev(false)}
						>
							<i className='exit_icon'></i>
						</div>
						<div
							className={add_col}
							onClick={() => imageInputRef.current?.click()}
						>
							<div className={add_circle}>
								<i className='addPhoto_icon'></i>
							</div>
							<span>Add Photos/Videos</span>
							<span>Or drag and drop files here.</span>
						</div>
					</div>
				)}
				<div className={add_pics_inside2}>
					<div className={add_circle}>
						<i className='phone_icon'></i>
					</div>
					<div className={mobile_text}>
						Add photos from your mobile device.
					</div>
					<span className={add_phone_btn}>Add</span>
				</div>
			</div>
		</div>
	);
};

export default ImagePreview;
