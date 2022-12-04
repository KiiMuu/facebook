import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from '../header.module.scss';
import DisplayAccessibility from './DisplayAccessibility';
import HelpSupport from './HelpSupport';
import SettingsPrivacy from './SettingsPrivacy';

const UserMenu: React.FC<{ user: UserInfo | null }> = ({ user }) => {
	const [visible, setVisible] = useState(0);

	const {
		user_menu,
		user_menu_header,
		user_menu_col,
		user_menu_splitter,
		user_menu_main,
		menu_span1,
		menu_span2,
		user_menu_item,
		rArrow,
	} = classes;

	return (
		<div className={user_menu}>
			{visible === 0 && (
				<div>
					<Link
						to='/profile'
						className={`${user_menu_header} hover3`}
					>
						<img src={user?.picture} alt={user?.username} />
						<div className={user_menu_col}>
							<span>
								{user?.firstName} {user?.lastName}
							</span>
							<span>See your profile</span>
						</div>
					</Link>
					<div className={user_menu_splitter}></div>
					<div className={`${user_menu_main} hover3`}>
						<div className='small_circle'>
							<i className='report_filled_icon'></i>
						</div>
						<div className={user_menu_col}>
							<div className={menu_span1}>Give feedback</div>
							<div className={menu_span2}>
								Help us improve Facebook
							</div>
						</div>
					</div>
					<div className={user_menu_splitter}></div>
					<div
						className={`${user_menu_item} hover3`}
						onClick={() => setVisible(1)}
					>
						<div className='small_circle'>
							<i className='settings_filled_icon'></i>
						</div>
						<span>Settings & Privacy</span>
						<div className={rArrow}>
							<i className='right_icon'></i>
						</div>
					</div>
					<div
						className={`${user_menu_item} hover3`}
						onClick={() => setVisible(2)}
					>
						<div className='small_circle'>
							<i className='help_filled_icon'></i>
						</div>
						<span>Help & Support</span>
						<div className={rArrow}>
							<i className='right_icon'></i>
						</div>
					</div>
					<div
						className={`${user_menu_item} hover3`}
						onClick={() => setVisible(3)}
					>
						<div className='small_circle'>
							<i className='dark_filled_icon'></i>
						</div>
						<span>Display & Accessibility</span>
						<div className={rArrow}>
							<i className='right_icon'></i>
						</div>
					</div>
					<div className={`${user_menu_item} hover3`}>
						<div className='small_circle'>
							<i className='logout_filled_icon'></i>
						</div>
						<span>Logout</span>
					</div>
				</div>
			)}
			{visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
			{visible === 2 && <HelpSupport setVisible={setVisible} />}
			{visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
		</div>
	);
};

export default UserMenu;
