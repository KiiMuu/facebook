import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import { ICloudImage } from 'src/interfaces/post';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { deletePost, savePost } from 'src/state/post/api';
import Option from './Option';
import classes from './options.module.scss';
import { saveAs } from 'file-saver';

const PostOptions: React.FC<{
	userId?: string;
	postUserId?: string;
	imagesLen?: number;
	postId?: string;
	images?: ICloudImage[] | null;
	setIsPostOptionsVisible: (state: boolean) => void;
}> = ({
	userId,
	postUserId,
	imagesLen,
	setIsPostOptionsVisible,
	postId,
	images,
}) => {
	const [isOptionAvailableToMe] = useState(userId === postUserId);
	const postOptionsRef = useRef(null);
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.user);
	const { isSavedPost } = useAppSelector(state => state.post);

	useDetectOutsideClicks(postOptionsRef, () =>
		setIsPostOptionsVisible(false)
	);

	const handleSavePost = async () => {
		try {
			const res = await dispatch(
				savePost({ postId, token: user?.token })
			).unwrap();

			toast.success(res.message, { duration: 5000 });
		} catch (error) {
			toast.error(error.message);
		}
	};

	const downloadPostPhotos = async () => {
		console.log({ images });
		images?.map(img => {
			return saveAs(img.url, 'image.jpeg');
		});
	};

	const handlePostDelete = async () => {
		try {
			await dispatch(deletePost({ postId: postId, token: user?.token }));

			toast.success('Post deleted successfully', {
				position: 'bottom-left',
			});
		} catch (error) {
			toast.error(error.message);
		}
	};

	const { post_options_menu, line } = classes;

	return (
		<ul className={`${post_options_menu} scrollbar`} ref={postOptionsRef}>
			{isOptionAvailableToMe && (
				<Option
					icon='pin_icon'
					title='Pin Post'
					subTitle='Pin this post at the top of your feed.'
				/>
			)}
			<div onClick={() => handleSavePost()}>
				<Option
					icon='save_icon'
					title={isSavedPost ? 'Unsave post' : 'Save post'}
					subTitle={
						isSavedPost
							? 'Remove this post from your saved items.'
							: 'Add this post to your saved items.'
					}
				/>
			</div>
			<div className={line}></div>
			{isOptionAvailableToMe && (
				<Option icon='edit_icon' title='Edit Post' />
			)}
			{!isOptionAvailableToMe && (
				<Option
					icon='turnOnNotification_icon'
					title='Turn on Notifications'
					subTitle='Get notifications for this post activities.'
				/>
			)}
			{imagesLen && (
				<div onClick={() => downloadPostPhotos()}>
					<Option icon='download_icon' title='Download' />
				</div>
			)}
			{imagesLen && (
				<Option icon='fullscreen_icon' title='Enter Fullscreen' />
			)}
			{isOptionAvailableToMe && (
				<Option
					img='icons/lock.png'
					title='Edit Audience'
					subTitle='Choose between public, custom or only me visibility for your post.'
				/>
			)}
			{isOptionAvailableToMe && (
				<Option
					icon='turnOffNotifications_icon'
					title='Turn off Notifications'
					subTitle='Mute notifications for this post.'
				/>
			)}
			{isOptionAvailableToMe && (
				<Option icon='delete_icon' title='Turn off Translations' />
			)}
			{isOptionAvailableToMe && (
				<Option icon='refresh_icon' title='Refresh Share Attatchment' />
			)}
			{isOptionAvailableToMe && (
				<Option icon='archive_icon' title='Move to Archive' />
			)}
			{isOptionAvailableToMe && (
				<div onClick={() => handlePostDelete()}>
					<Option
						icon='trash_icon'
						title='Move to Trash'
						subTitle='Items in your trash are deleted after 30 day.'
					/>
				</div>
			)}
			{!isOptionAvailableToMe && <div className={line}></div>}
			{!isOptionAvailableToMe && (
				<Option
					img='/icons/report.png'
					title='Report Post'
					subTitle="I'm concerned about this post."
				/>
			)}
		</ul>
	);
};

export default PostOptions;
