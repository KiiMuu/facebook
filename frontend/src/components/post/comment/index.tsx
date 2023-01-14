import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import classes from './comment.module.scss';

const CreateComment: React.FC<{ user: UserInfo | null }> = ({ user }) => {
	const [picker, setPicker] = useState(false);
	const [comment, setComment] = useState('');
	const [commentImage, setCommentImage] = useState<
		string | ArrayBuffer | null | undefined
	>(null);
	const [cursorPosition, setCursorPosition] = useState<number>();
	const commentRef = useRef<any>(null);
	const imageInputRef = useRef<HTMLInputElement | null>(null);
	const allowedFiles = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

	const handleEmoji = ({ emoji }: { emoji: string }) => {
		const ref = commentRef.current;

		const start = comment.substring(0, ref?.selectionStart);
		const end = comment.substring(ref?.selectionStart);
		const newText = start + emoji + end;

		setComment(newText);
		setCursorPosition(start.length + emoji.length);

		ref?.focus();
	};

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

			reader.readAsDataURL(file as Blob);

			reader.onload = readerEvent => {
				setCommentImage(readerEvent.target?.result);
			};
		}
	};

	useEffect(() => {
		commentRef.current.selectionEnd = cursorPosition;
	}, [cursorPosition, commentRef]);

	const {
		create_comment_wrap,
		create_comment,
		comment_input_wrap,
		comment_emoji_picker,
		comment_circle_icon,
		comment_image_preview,
		exit,
	} = classes;

	return (
		<div className={create_comment_wrap}>
			<div className={create_comment}>
				<img src={user?.picture} alt={user?.username} />
				<div className={comment_input_wrap}>
					{picker && (
						<div className={comment_emoji_picker}>
							<EmojiPicker onEmojiClick={handleEmoji} />
						</div>
					)}
					<input
						type='file'
						accept='image/jpeg,image/png,image/webp,image/gif'
						hidden
						ref={imageInputRef}
						onChange={handleFileChange}
					/>
					<input
						type='text'
						placeholder='Leave a Comment...'
						value={comment}
						onChange={e => setComment(e.target.value)}
						ref={commentRef}
					/>
					<div
						className={`${comment_circle_icon} hover2`}
						onClick={() => setPicker(prev => !prev)}
					>
						<i className='emoji_icon'></i>
					</div>
					<div
						className={`${comment_circle_icon} hover2`}
						onClick={() => imageInputRef.current?.click()}
					>
						<i className='camera_icon'></i>
					</div>
					<div className={`${comment_circle_icon} hover2`}>
						<i className='gif_icon'></i>
					</div>
					<div className={`${comment_circle_icon} hover2`}>
						<i className='sticker_icon'></i>
					</div>
				</div>
			</div>
			{commentImage && (
				<div className={comment_image_preview}>
					<img src={commentImage as string} alt='comment media' />
					<div
						className={exit}
						onClick={() => setCommentImage(null)}
						title='Remove'
					>
						<i className='exit_icon'></i>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateComment;
