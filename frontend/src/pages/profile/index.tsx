import { useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
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

const Profile: React.FC<{
	setPostPopupVisibility: Dispatch<SetStateAction<boolean>>;
}> = ({ setPostPopupVisibility }) => {
	const dispatch = useAppDispatch();
	const { user, profile } = useAppSelector(state => state.user);
	const { username } = useParams();
	const navigate = useNavigate();

	const urlUsername = !username ? user?.username : username;
	const isVisitor = urlUsername !== user?.username;

	const fetchUserProfile = useCallback(async () => {
		try {
			let res = await dispatch(
				getUserProfile({ token: user?.token, username: urlUsername })
			);

			if (res.meta.requestStatus === 'rejected') {
				navigate('/');
			}
		} catch (error) {
			toast.error(error.message);
		}
	}, [dispatch, navigate, urlUsername, user?.token]);

	useEffect(() => {
		fetchUserProfile();
	}, [fetchUserProfile, isVisitor]);

	console.log({ profile, isVisitor });

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
							<div className={profile_left}></div>
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
