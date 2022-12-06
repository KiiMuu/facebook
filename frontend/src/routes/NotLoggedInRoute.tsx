import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/state/hooks';

const NotLoggedInRoute: React.FC = () => {
	const { user } = useAppSelector(state => state.user);

	return user ? <Navigate to='/' /> : <Outlet />;
};

export default NotLoggedInRoute;
