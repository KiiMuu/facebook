import { useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from 'src/components/header';
import CreatePost from 'src/components/post/create';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { getUserProfile } from 'src/state/user/api';
import Cover from 'src/components/profile/Cover';
import GridPosts from 'src/components/profile/GridPosts';
import Menu from 'src/components/profile/Menu';
import PeopleYouMayKnow from 'src/components/profile/PeopleYouMayKnow';
import ProfilePictureInfos from 'src/components/profile/PPInfos';
import classes from './profile.module.scss';
import Post from 'src/components/post/Post';
import Photos from 'src/components/profile/Photos';
import Friends from 'src/components/profile/Friends';
import { getPhotos } from 'src/state/photos/api';

const Profile: React.FC<{
	setPostPopupVisibility: Dispatch<SetStateAction<boolean>>;
}> = ({ setPostPopupVisibility }) => {
	const dispatch = useAppDispatch();
	const { user, profile } = useAppSelector(state => state.user);
	const { username } = useParams();
	const navigate = useNavigate();

	const urlUsername = !username ? user?.username : username;
	const isVisitor = urlUsername !== user?.username;
	const path = `${urlUsername}/*`;
	const max = 30;
	const sort = 'desc';

	const fetchUserProfile = useCallback(async () => {
		try {
			let res = await dispatch(
				getUserProfile({ token: user?.token, username: urlUsername })
			);

			if (res.meta.requestStatus === 'fulfilled') {
				dispatch(getPhotos({ token: user?.token, path, max, sort }));
			}

			if (res.meta.requestStatus === 'rejected') {
				navigate('/');
			}
		} catch (error) {
			toast.error(error.message);
		}
	}, [dispatch, navigate, urlUsername, user?.token, path]);

	useEffect(() => {
		fetchUserProfile();
	}, [fetchUserProfile, isVisitor]);

	const {
		profile_wrap,
		profile_top,
		profile_container,
		profile_bottom,
		bottom_container,
		profile_grid,
		profile_left,
		profile_right,
	} = classes;

	return (
		<div className={profile_wrap}>
			<Header page='profile' />
			<div className={profile_top}>
				<div className={profile_container}>
					<Cover
						cover={profile?.cover}
						username={profile?.username}
						isVisitor={isVisitor}
					/>
					<ProfilePictureInfos
						profile={profile}
						isVisitor={isVisitor}
					/>
					<Menu />
				</div>
			</div>
			<div className={profile_bottom}>
				<div className={profile_container}>
					<div className={bottom_container}>
						<PeopleYouMayKnow />
						<div className={profile_grid}>
							<div className={profile_left}>
								<Photos />
								<Friends friends={profile?.friends} />
								<div className='fb_copyright'>
									<Link to=''>Privacy</Link>
									<span>, </span>
									<Link to=''>Terms</Link>
									<span>, </span>
									<Link to=''>Advertising</Link>
									<span>, </span>
									<Link to=''>
										Ad Choices{' '}
										<i className='ad_choices_icon'></i>
									</Link>
									<span>, </span>
									<Link to=''>Cookies</Link>
									<span>, </span>
									<Link to=''>More</Link>
									<span>
										, Meta &copy; {new Date().getFullYear()}
									</span>
								</div>
							</div>
							<div className={profile_right}>
								{!isVisitor && (
									<CreatePost
										user={user}
										setPostPopupVisibility={
											setPostPopupVisibility
										}
										profile
									/>
								)}
								<GridPosts />
								<div className='posts'>
									{profile?.posts.map(post => (
										<Post
											key={post._id}
											post={post}
											user={post.user}
											profile
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
