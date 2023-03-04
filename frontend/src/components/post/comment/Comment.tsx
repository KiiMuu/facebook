import Moment from 'react-moment';
import { IComment } from 'src/interfaces/post';
import classes from './comment.module.scss';

const Comment: React.FC<{ comment: IComment }> = ({ comment }) => {
	const {
		comment_wrapper,
		creator_img,
		comment_col,
		comment_wrap,
		comment_name,
		comment_img,
		comment_text,
		created_at,
		name_and_date,
		like_reply,
	} = classes;

	return (
		<div className={comment_wrapper}>
			<img
				src={comment.commentedBy?.picture}
				alt={comment.commentedBy?.username}
				className={creator_img}
			/>
			<div className={comment_col}>
				<div className={comment_wrap}>
					<div className={name_and_date}>
						<div className={comment_name}>
							{comment.commentedBy?.firstName}{' '}
							{comment.commentedBy?.lastName}
						</div>
						{' . '}
						<div className={created_at}>
							<Moment fromNow interval={30}>
								{comment.commentedAt}
							</Moment>
						</div>
					</div>
					{comment.comment ? (
						<div className={comment_text}>{comment.comment}</div>
					) : null}
					{comment.image ? (
						<img
							src={comment.image as string}
							alt={comment.image as string}
							className={comment_img}
						/>
					) : null}
					<div className={like_reply}>
						<span>Like</span>
						<span>Reply</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Comment;
