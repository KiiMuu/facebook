import { Routes, Route } from 'react-router-dom';
// -> pages
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './pages/profile';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/register' element={<Register />} />
			<Route path='/login' element={<Login />} />
			<Route path='/profile' element={<Profile />} />
		</Routes>
	);
}

export default App;
