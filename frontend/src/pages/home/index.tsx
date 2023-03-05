import ResendVerificationCode from 'src/components/home/sendVerifyCode';
import Stories from 'src/components/home/stories';
import HomeLayout from 'src/components/partials/HomeLayout';
import Posts from 'src/components/post';
import CreatePost from 'src/components/post/create';
import { useAppSelector } from 'src/state/hooks';

const Home: React.FC<{
	setPostPopupVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setPostPopupVisibility }) => {
	const { user } = useAppSelector(state => state.user);

	return (
		<HomeLayout>
			<Stories />
			{!user?.verified && <ResendVerificationCode />}
			<CreatePost
				user={user}
				setPostPopupVisibility={setPostPopupVisibility}
			/>
			<Posts />
		</HomeLayout>
	);
};

export default Home;
