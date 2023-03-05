import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import LeftLink from './LeftLink';
import { left } from 'src/data/home';
import classes from '../home.module.scss';
import { ArrowDown1 } from 'src/svg';
import Shortcut from './Shortcut';

const LeftHome: React.FC<{ user: UserInfo | null }> = ({ user }) => {
	const [visible, setVisible] = useState(false);

	const query1175px = useMediaQuery({
		query: '(max-width: 1175px)',
	});

	const {
		left_home,
		left_link,
		more_left,
		shortcut,
		heading,
		edit_shortcut,
		shortcut_list,
	} = classes;

	return (
		<div className={`${left_home} scrollbar`}>
			<Link
				to={`/profile/${user?.username}`}
				className={`${left_link} hover1`}
			>
				<img src={user?.picture} alt={user?.username} />
				<span>
					{user?.firstName} {user?.lastName}
				</span>
			</Link>
			{left.slice(0, 8).map((link, i) => (
				<LeftLink
					key={i}
					img={link.img}
					text={link.text}
					url={link.url}
					notification={link.notification}
				/>
			))}
			{!visible && (
				<div
					className={`${left_link} hover1`}
					onClick={() => setVisible(true)}
				>
					<div className='small_circle'>
						<ArrowDown1 />
					</div>
					<span>See More</span>
				</div>
			)}
			{visible && (
				<div className={more_left}>
					{left.slice(8, left.length).map((link, i) => (
						<LeftLink
							key={i}
							img={link.img}
							text={link.text}
							notification={link.notification}
						/>
					))}
					<div
						className={`${left_link} hover1`}
						onClick={() => setVisible(false)}
					>
						<div className='small_circle rotate360'>
							<ArrowDown1 />
						</div>
						<span>Show Less</span>
					</div>
				</div>
			)}
			{!query1175px && <div className='splitter'></div>}
			<div className={shortcut}>
				<div className={heading}>Your shortcuts</div>
				<div className={edit_shortcut}>Edit</div>
			</div>
			<div className={shortcut_list}>
				<Shortcut
					link='https://www.youtube.com'
					img='/images/ytb.png'
					name='My Youtube channel'
				/>
				<Shortcut
					link='https://www.instagram.com'
					img='/images/insta.png'
					name='My Instagram account'
				/>
			</div>
			<div className='fb_copyright'>
				<Link to=''>Privacy</Link>
				<span>, </span>
				<Link to=''>Terms</Link>
				<span>, </span>
				<Link to=''>Advertising</Link>
				<span>, </span>
				<Link to=''>
					Ad Choices <i className='ad_choices_icon'></i>
				</Link>
				<span>, </span>
				<Link to=''>Cookies</Link>
				<span>, </span>
				<Link to=''>More</Link>
				<span>, Meta &copy; {new Date().getFullYear()}</span>
			</div>
		</div>
	);
};

export default LeftHome;
