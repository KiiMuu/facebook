import { Routes, Route } from 'react-router-dom';
// -> pages
import Home from './pages/home';
import Activate from './pages/home/activate';
import Login from './pages/login';
import Profile from './pages/profile';
// -> guards
import LoggedInRoute from './routes/LoggedInRoute';
import NotLoggedInRoute from './routes/NotLoggedInRoute';

function App() {
	return (
		<Routes>
			<Route element={<NotLoggedInRoute />}>
				<Route path='/login' element={<Login />} />
			</Route>
			<Route element={<LoggedInRoute />}>
				<Route path='/' element={<Home />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/activate/:token' element={<Activate />} />
			</Route>
		</Routes>
	);
}

export default App;
