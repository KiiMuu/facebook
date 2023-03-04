import EmojiPicker from 'emoji-picker-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import dataURItoBlob from 'src/helpers/dataUrlToBlob';
import { IComment } from 'src/interfaces/post';
import { useAppDispatch } from 'src/state/hooks';
import { createPostComment, uploadImages } from 'src/state/post/api';
import classes from './comment.module.scss';

const CreateComment: React.FC<{
	user: UserInfo | null;
	postId: string;
	setCommentsCount: Dispatch<SetStateAction<number>>;
	setPostComments: Dispatch<SetStateAction<IComment[] | undefined>>;
}> = ({ user, postId, setCommentsCount, setPostComments }) => {
	const [picker, setPicker] = useState(false);
	const [comment, setComment] = useState('');
	const [commentImage, setCommentImage] = useState<
		string | ArrayBuffer | null | undefined
	>(null);
	const [cursorPosition, setCursorPosition] = useState<number>();
	const commentRef = useRef<any>(null);
	const imageInputRef = useRef<HTMLInputElement | null>(null);
	const allowedFiles = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

	const dispatch = useAppDispatch();

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

	const handleCreateComment = async (
		e: React.KeyboardEvent<HTMLDivElement>
	) => {
		if (e.key === 'Enter') {
			const toastId = toast.loading(
				'Please wait while your comment is being created...',
				{ position: 'bottom-left' }
			);

			if (!comment && !commentImage) {
				toast.dismiss(toastId);

				return toast.error(
					'Please enter a comment or upload an image.',
					{ position: 'bottom-left' }
				);
			}

			let imgComment;
			if (commentImage) {
				const img = dataURItoBlob(commentImage);

				const path = `${user?.username}/post/comments/${postId}/images`;
				const formData = new FormData();

				formData.append('path', path);
				formData.append('file', img);

				imgComment = await dispatch(
					uploadImages({ formData, token: user?.token })
				).unwrap();
			}

			try {
				const comments = await dispatch(
					createPostComment({
						postId,
						comment,
						image: imgComment && imgComment[0].url,
						token: user?.token,
					})
				).unwrap();

				toast.success('Comment created.');
				setCommentImage(null);
				setComment('');
				setPostComments(comments);
				setCommentsCount((prev: number) => ++prev);
				toast.dismiss(toastId);
			} catch (error) {
				toast.dismiss(toastId);
				toast.error(error.message);
			}
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
						onKeyUp={e => handleCreateComment(e)}
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
