import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/state/hooks';
import Login from 'src/pages/login';

const LoggedInRoute: React.FC = () => {
	const { user } = useAppSelector(state => state.user);

	return user ? <Outlet /> : <Login />;
};

export default LoggedInRoute;
