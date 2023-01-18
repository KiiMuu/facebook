import { Link } from 'react-router-dom';
import { Dots } from 'src/svg';
import classes from './profile.module.scss';

const Menu = () => {
	const { profile_menu_wrap, profile_menu, profile_menu_active, p10_dots } =
		classes;

	return (
		<div className={profile_menu_wrap}>
			<div className={profile_menu}>
				<Link to='/' className={profile_menu_active}>
					Posts
				</Link>
				<Link to='/' className='hover1'>
					About
				</Link>
				<Link to='/' className='hover1'>
					Friends
				</Link>
				<Link to='/' className='hover1'>
					Photos
				</Link>
				<Link to='/' className='hover1'>
					Videos
				</Link>
				<Link to='/' className='hover1'>
					Check-ins
				</Link>
				<Link to='/' className='hover1'>
					More
				</Link>
				<div className={p10_dots}>
					<Dots color='' />
				</div>
			</div>
		</div>
	);
};

export default Menu;
