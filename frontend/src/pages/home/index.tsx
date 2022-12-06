import Header from 'src/components/header';
import LeftHome from 'src/components/home/left';
import RightHome from 'src/components/home/right';
import { useAppSelector } from 'src/state/hooks';

const Home: React.FC = () => {
	const { user } = useAppSelector(state => state.user);

	return (
		<>
			<Header />
			<LeftHome user={user} />
			<RightHome user={user} />
		</>
	);
};

export default Home;
