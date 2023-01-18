import { useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Header from 'src/components/header';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { getUserProfile } from 'src/state/user/api';
import Cover from './Cover';
import Menu from './Menu';
import PeopleYouMayKnow from './PeopleYouMayKnow';
import ProfilePictureInfos from './PPInfos';
import classes from './profile.module.scss';

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user, profile } = useAppSelector(state => state.user);
	const { username } = useParams();
	const navigate = useNavigate();

	const urlUsername = !username ? user?.username : username;

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
	}, [fetchUserProfile]);

	const {
		profile_wrap,
		profile_top,
		profile_container,
		profile_bottom,
		bottom_container,
	} = classes;

	return (
		<div className={profile_wrap}>
			<Header page='profile' />
			<div className={profile_top}>
				<div className={profile_container}>
					<Cover
						cover={profile?.cover}
						username={profile?.username}
					/>
					<ProfilePictureInfos profile={profile} />
					<Menu />
				</div>
			</div>
			<div className={profile_bottom}>
				<div className={profile_container}>
					<div className={bottom_container}>
						<PeopleYouMayKnow />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
