import { Routes, Route } from 'react-router-dom';
// -> pages
import Home from './pages/home';
import Activate from './pages/home/activate';
import Login from './pages/login';
import Profile from './pages/profile';
import Reset from './pages/reset';
// -> guards
import LoggedInRoute from './routes/LoggedInRoute';
import NotLoggedInRoute from './routes/NotLoggedInRoute';
// -> components
import PostPopup from './components/post/popup';
// -> states
import { useAppSelector } from './state/hooks';

function App() {
	const { user } = useAppSelector(state => state.user);

	return (
		<>
			<PostPopup user={user} />
			<Routes>
				<Route element={<NotLoggedInRoute />}>
					<Route path='/login' element={<Login />} />
					<Route path='/reset' element={<Reset />} />
				</Route>
				<Route element={<LoggedInRoute />}>
					<Route path='/' element={<Home />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/activate/:token' element={<Activate />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
