import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/state/hooks';
import SearchMenu from './SearchMenu';
import {
	ArrowDown,
	Friends,
	Gaming,
	Home,
	HomeActive,
	Logo,
	Market,
	Menu,
	Messenger,
	Notifications,
	Search,
	Watch,
} from 'src/svg';
import classes from './header.module.scss';
import AllMenu from './AllMenu';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import UserMenu from './userMenu';

const Header: React.FC<{ page?: string }> = ({ page }) => {
	const [showSearchMenu, setShowSearchMenu] = useState(false);
	const [showAllMenu, setShowAllMenu] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const allMenu = useRef(null);
	const userMenu = useRef(null);

	useDetectOutsideClicks(allMenu, () => setShowAllMenu(false));
	useDetectOutsideClicks(userMenu, () => setShowUserMenu(false));

	// state!
	const { user } = useAppSelector(state => state.user);

	const {
		header_left,
		header_logo,
		circle,
		header_middle,
		header_right,
		search,
		search1,
		hide_input,
		middle_icon,
		middle_notitfication,
		profile_link,
		circle_icon,
		right_notitfication,
		active_header,
        username_profile
	} = classes;

	return (
		<header>
			<div className={header_left}>
				<Link to='/' className={header_logo}>
					<div className={circle}>
						<Logo />
					</div>
				</Link>
				<div
					className={`${search} ${search1}`}
					onClick={() => setShowSearchMenu(true)}
				>
					<Search color='#65676b' />
					<input
						type='text'
						placeholder='Search Facebook'
						className={hide_input}
					/>
				</div>
			</div>
			{showSearchMenu && (
				<SearchMenu setShowSearchMenu={setShowSearchMenu} />
			)}
			<div className={header_middle}>
				<Link
					to='/'
					className={`${middle_icon} ${
						page === 'home' ? 'active' : 'hover1'
					}`}
				>
					{page === 'home' ? <HomeActive /> : <Home color='' />}
				</Link>
				<Link to='/' className={`${middle_icon} hover1`}>
					<Friends color='' />
				</Link>
				<Link to='/' className={`${middle_icon} hover1`}>
					<Watch color='' />
					<div className={middle_notitfication}>9+</div>
				</Link>
				<Link to='/' className={`${middle_icon} hover1`}>
					<Market color='' />
				</Link>
				<Link to='/' className={`${middle_icon} hover1`}>
					<Gaming color='' />
				</Link>
			</div>
			<div className={header_right}>
				<Link
					to={`/profile/${user?.username}`}
					className={`${profile_link} hover1 ${
						page === 'profile' ? active_header : ''
					}`}
				>
					<img src={user?.picture} alt={user?.username} />
					<span className={username_profile}>{user?.firstName}</span>
				</Link>
				<div
					className={`${circle_icon} ${
						showAllMenu && active_header
					} hover1`}
					ref={allMenu}
				>
					<div
						onClick={() => setShowAllMenu(prev => !prev)}
						style={{ display: 'flex' }}
					>
						<Menu />
					</div>
					{showAllMenu && <AllMenu />}
				</div>
				<div className={`${circle_icon} hover1`}>
					<Messenger />
				</div>
				<div className={`${circle_icon} hover1`}>
					<Notifications />
					<div className={right_notitfication}>9+</div>
				</div>
				<div
					className={`${circle_icon} ${
						showUserMenu && active_header
					} hover1`}
					ref={userMenu}
				>
					<div
						onClick={() => setShowUserMenu(prev => !prev)}
						style={{ display: 'flex' }}
					>
						<ArrowDown color='' />
					</div>
					{showUserMenu && <UserMenu user={user} />}
				</div>
			</div>
		</header>
	);
};

export default Header;
