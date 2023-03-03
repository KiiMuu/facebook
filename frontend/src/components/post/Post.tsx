import Moment from 'react-moment';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IPost } from 'src/interfaces/post';
import { Dots, Public } from 'src/svg';
import PostReacts from './popup/PostReacts';
import classes from './posts.module.scss';
import CreateComment from './comment';
import PostOptions from './options';
import axios from 'axios';
import { useAppDispatch } from 'src/state/hooks';
import { reactOnPost } from 'src/state/react/api';
import { toast } from 'react-hot-toast';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';

const Post: React.FC<{
	post: IPost;
	user: UserInfo | null;
	profile?: boolean;
}> = ({ post, user, profile }) => {
	const [areReactsVisible, setAreReactsVisible] = useState(false);
	const [isPostOptionsVisible, setIsPostOptionsVisible] = useState(false);
	const [totalReacts, setTotalReacts] = useState(0);
	const [reactedByMeType, setReactedByMeType] = useState('');
	const [postReacts, setPostReacts] = useState<any[]>([]);
	const reactActionRef = useRef(null);

	const dispatch = useAppDispatch();

	useDetectOutsideClicks(reactActionRef, () => setAreReactsVisible(false));

	const handleReactOnPost = useCallback(
		async (reactName: string) => {
			try {
				await dispatch(
					reactOnPost({
						postId: post?._id,
						react: reactName,
						token: user?.token,
					})
				);

				if (reactedByMeType === reactName) {
					setReactedByMeType('');

					let index = postReacts.findIndex(
						x => x.react === reactedByMeType
					);

					if (index !== -1) {
						setPostReacts([
							...postReacts,
							(postReacts[index].count = --postReacts[index]
								.count),
						]);
						setTotalReacts(prev => --prev);
					}
				} else {
					setReactedByMeType(reactName);

					let index = postReacts.findIndex(
						x => x.react === reactName
					);
					let index1 = postReacts.findIndex(
						x => x.react === reactedByMeType
					);
					if (index !== -1) {
						setPostReacts([
							...postReacts,
							(postReacts[index].count = ++postReacts[index]
								.count),
						]);
						setTotalReacts(prev => ++prev);
					}
					if (index1 !== -1) {
						setPostReacts([
							...postReacts,
							(postReacts[index1].count = --postReacts[index1]
								.count),
						]);
						setTotalReacts(prev => --prev);
					}
				}

				setAreReactsVisible(false);
			} catch (error) {
				toast.error(error.message);
			}
		},
		[dispatch, post?._id, reactedByMeType, user?.token, postReacts]
	);

	const fetchPostReacts = useCallback(async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/reacts/${post?._id}`,
				{
					headers: {
						Authorization: `Bearer ${user?.token}`,
					},
				}
			);

			setReactedByMeType(data.reactedByMeType);
			setPostReacts(data.reacts);
			setTotalReacts(data.total);
		} catch (error) {
			console.log(error.message);
		}
	}, [post?._id, user?.token]);

	useEffect(() => {
		fetchPostReacts();
	}, [fetchPostReacts]);

	const getReactTextColor = (isBg: boolean) => {
		switch (reactedByMeType) {
			case 'like':
				return isBg ? 'rgba(66, 103, 178, .05)' : '#4267b2';
			case 'love':
				return isBg ? 'rgba(246, 52, 89, .05)' : '#f63459';
			case 'haha':
				return isBg ? 'rgba(247, 177, 37, .05)' : '#f7b125';
			case 'sad':
				return isBg ? 'rgba(247, 177, 37, .05)' : '#f7b125';
			case 'wow':
				return isBg ? 'rgba(247, 177, 37, .05)' : '#f7b125';
			case 'angry':
				return isBg ? 'rgba(246, 52, 89, .05)' : '#f63459';
			default:
				return isBg ? '' : 'var(--color-secondary)';
		}
	};

	const reactTextColor = {
		color: getReactTextColor(false),
	};
	const reactBgColor = {
		backgroundColor: getReactTextColor(true),
	};

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
		post_profile_wrap,
		post_updated_bg,
		post_updated_pic,
		post_cover_wrap,
	} = classes;

	return (
		<div className={post_wrap} style={{ width: `${profile && '100%'}` }}>
			<div className={post_header}>
				<Link
					to={`/profile/${post.user?.username}`}
					className={header_left}
				>
					<img src={post.user?.picture} alt={post.user?.username} />
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
			) : post.type === null ? (
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
								<img
									key={i}
									src={img.url}
									alt={img.url}
									loading='lazy'
								/>
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
			) : post.type === 'profilePicture' ? (
				<div className={post_profile_wrap}>
					<div className={post_updated_bg}>
						<img
							src={post.user?.cover}
							alt={post.user?.username}
							loading='lazy'
						/>
					</div>
					<img
						src={post?.images![0]?.url}
						alt={post?.user?.username}
						loading='lazy'
						className={post_updated_pic}
					/>
				</div>
			) : (
				<div className={post_cover_wrap}>
					<img
						src={post?.images![0]?.url}
						alt={post?.user?.username}
						loading='lazy'
					/>
				</div>
			)}
			<div className={post_infos}>
				<div className={reacts_count}>
					<div className={reacts_counts_images}>
						{postReacts
							.sort((a, b) => {
								return b.count - a.count;
							})
							?.slice(0, 3)
							?.map(
								react =>
									react.count > 0 && (
										<img
											src={`../../reacts/${react.react}.svg`}
											alt={react.react}
											key={react.react}
											title={`${react.count}`}
										/>
									)
							)}
					</div>
					<div className={reacts_counts_num}>
						{totalReacts ? totalReacts : null}
					</div>
				</div>
				<div className={to_right}>
					<div className={comments_count}>4 comments</div>
					<div className={shares_count}>12 share</div>
				</div>
			</div>
			<div className={post_actions}>
				<PostReacts
					areReactsVisible={areReactsVisible}
					handleReactOnPost={handleReactOnPost}
					reactedByMeType={reactedByMeType}
					setReactedByMeType={setReactedByMeType}
					reactActionRef={reactActionRef}
				/>
				<div
					ref={reactActionRef}
					className={`${post_action} hover1`}
					style={reactBgColor}
					onMouseOver={() =>
						setTimeout(() => setAreReactsVisible(true), 500)
					}
					onClick={() =>
						handleReactOnPost(
							reactedByMeType ? reactedByMeType : 'like'
						)
					}
				>
					{reactedByMeType ? (
						<img
							src={`../../reacts/${reactedByMeType}.svg`}
							alt={reactedByMeType}
							loading='lazy'
							width={'20px'}
						/>
					) : (
						<i className='like_icon'></i>
					)}
					<span style={reactTextColor}>
						{reactedByMeType ? reactedByMeType : 'Like'}
					</span>
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
