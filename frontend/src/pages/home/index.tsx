import Header from 'src/components/header';
import LeftHome from 'src/components/home/left';
import RightHome from 'src/components/home/right';
import Stories from 'src/components/home/stories';
import CreatePost from 'src/components/post/create';
import { useAppSelector } from 'src/state/hooks';
import classes from './home.module.scss';

const Home: React.FC = () => {
	const { user } = useAppSelector(state => state.user);

	const { home, home_middle } = classes;

	return (
		<div className={home}>
			<Header />
			<LeftHome user={user} />
			<div className={home_middle}>
				<Stories />
				<CreatePost user={user} />
			</div>
			<RightHome user={user} />
		</div>
	);
};

export default Home;
