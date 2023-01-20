import Moment from 'react-moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IPost } from 'src/interfaces/post';
import { Dots, Public } from 'src/svg';
import PostReacts from './popup/PostReacts';
import classes from './posts.module.scss';
import CreateComment from './comment';
import PostOptions from './options';

const Post: React.FC<{
	post: IPost;
	user: UserInfo | null;
	profile?: boolean;
}> = ({ post, user, profile }) => {
	const [areReactsVisible, setAreReactsVisible] = useState(false);
	const [isPostOptionsVisible, setIsPostOptionsVisible] = useState(false);

	const {
		post_wrap,
		post_header,
		header_left,
		header_col,
		post_profile_name,
		updated_p,
		post_profile_privacy_date,
		header_right,
		post_bg,
		post_bg_text,
		post_text,
		preview1,
		preview2,
		preview3,
		preview4,
		preview5,
		preview6,
		singular_grid,
		more_pics_shadow,
		blur,
		post_infos,
		reacts_count,
		reacts_counts_images,
		reacts_counts_num,
		to_right,
		comments_count,
		shares_count,
		post_actions,
		post_action,
		comments_wrap,
		comments_order,
	} = classes;

	return (
		<div className={post_wrap} style={{ width: `${profile && '100%'}` }}>
			<div className={post_header}>
				<Link
					to={`/profile/${post.user?.username}`}
					className={header_left}
				>
					<img src={post.user?.picture} alt='' />
					<div className={header_col}>
						<div className={post_profile_name}>
							{post.user?.firstName} {post.user?.lastName}
							<div className={updated_p}>
								{post.type === 'profilePicture' &&
									`Updated ${
										post.user?.gender === 'male'
											? 'his'
											: 'her'
									} profile picture`}
								{post.type === 'cover' &&
									`Updated ${
										post.user?.gender === 'male'
											? 'his'
											: 'her'
									} cover photo`}
							</div>
						</div>
						<div className={post_profile_privacy_date}>
							<Moment fromNow interval={30}>
								{post.createdAt}
							</Moment>
							. <Public color='#828387' />
						</div>
					</div>
				</Link>
				<div
					className={`${header_right} hover1`}
					onClick={() => setIsPostOptionsVisible(prev => !prev)}
				>
					<Dots color='#828387' />
				</div>
			</div>
			{post.background ? (
				<div
					className={post_bg}
					style={{ backgroundImage: `url(${post.background})` }}
				>
					<div className={post_bg_text}>{post.text}</div>
				</div>
			) : (
				<>
					<div className={post_text}>{post.text}</div>
					{post.images?.length ? (
						<div
							className={
								post.images.length === 1
									? preview1
									: post.images.length === 2
									? preview2
									: post.images.length === 3
									? preview3
									: post.images.length === 4
									? preview4
									: post.images.length === 5
									? preview5
									: post.images.length % 2 === 0
									? preview6
									: `${preview6} ${singular_grid}`
							}
						>
							{post.images.slice(0, 4).map((img, i) => (
								<img key={i} src={img.url} alt={img.url} />
							))}
							{post.images.length > 4 && (
								<div className={more_pics_shadow}>
									<img
										src={post.images[5]?.url}
										alt={post.images[5]?.url}
									/>
									<span className={blur}></span>
									<span className='small_circle'>
										+{post.images.length - 4}
									</span>
								</div>
							)}
						</div>
					) : null}
				</>
			)}
			<div className={post_infos}>
				<div className={reacts_count}>
					<div className={reacts_counts_images}></div>
					<div className={reacts_counts_num}></div>
				</div>
				<div className={to_right}>
					<div className={comments_count}>4 comments</div>
					<div className={shares_count}>12 share</div>
				</div>
			</div>
			<div className={post_actions}>
				<PostReacts
					areReactsVisible={areReactsVisible}
					setAreReactsVisible={setAreReactsVisible}
				/>
				<div
					className={`${post_action} hover1`}
					onMouseOver={() =>
						setTimeout(() => setAreReactsVisible(true), 500)
					}
					onMouseLeave={() =>
						setTimeout(() => setAreReactsVisible(false), 500)
					}
				>
					<i className='like_icon'></i>
					<span>Like</span>
				</div>
				<div className={`${post_action} hover1`}>
					<i className='comment_icon'></i>
					<span>Comments</span>
				</div>
				<div className={`${post_action} hover1`}>
					<i className='share_icon'></i>
					<span>Shares</span>
				</div>
			</div>
			<div className={comments_wrap}>
				<div className={comments_order}></div>
				<CreateComment user={user} />
			</div>
			{isPostOptionsVisible && (
				<PostOptions
					userId={user?.id}
					postUserId={post.user?._id}
					imagesLen={post.images?.length}
					setIsPostOptionsVisible={setIsPostOptionsVisible}
				/>
			)}
		</div>
	);
};

export default Post;
