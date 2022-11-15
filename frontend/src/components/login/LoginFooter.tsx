import { Link } from 'react-router-dom';
import classes from '../../pages/login/login.module.scss';

const LoginFooter: React.FC = () => {
	return (
		<footer className={classes.login_footer}>
			<div className={classes.login_footer_wrap}>
				<Link to='/' title='English UK'>
					English (UK)
				</Link>
				<Link to='/' title='Arabic'>
					العربية
				</Link>
				<Link to='/' title='Français'>
					Français (France)
				</Link>
				<Link to='/' title='Italiano'>
					Italy
				</Link>
				<Link to='/' title='German'>
					Deutsch
				</Link>
				<Link to='/' title='Russian'>
					Русский
				</Link>
				<Link to='/' title='Spanish'>
					Español
				</Link>
				<Link to='/' title='Indonesian'>
					Bahasa Indonesia
				</Link>
				<Link to='/' title='Turkish'>
					Türkçe
				</Link>
				<Link to='/' title='Português'>
					Português (Brasil)
				</Link>
				<Link to='/' title='Hindi'>
					हिन्दी
				</Link>
				<Link to='/' title='Add new language'>
					+
				</Link>
			</div>
			<div className={classes.footer_splitter}></div>
			<div className={classes.login_footer_wrap}>
				<Link to='/' title='Create a new account'>
					Sign Up
				</Link>
				<Link to='/' title='Login to Facebook'>
					Log In
				</Link>
				<Link to='/' title='Take a look at Messenger'>
					Messenger
				</Link>
				<Link to='/' title='Facebook Lite for Android'>
					Facebook Lite
				</Link>
				<Link to='/' title='Browse or watch videos'>
					Watch
				</Link>
				<Link to='/' title='Take a look at popular places on Facebook'>
					Places
				</Link>
				<Link to='/' title='Check out Facebook games'>
					Games
				</Link>
				<Link to='/' title='Buy and sell on Facebook'>
					Marketplace
				</Link>
				<Link to='/' title='Learn more about Meta Play'>
					Meta Play
				</Link>
				<Link to='/' title='Learn more about Oculus'>
					Oculus
				</Link>
				<Link to='/' title='Learn more about Facebook Portal'>
					Portal
				</Link>
				<Link to='/' title='Take a look at Instagram'>
					Instagram
				</Link>
				<Link to='/' title='Take a look at Bulletin newsletter'>
					Bulletin
				</Link>
				<Link to='/' title='Browse our local lists directory'>
					Local
				</Link>
				<Link to='/' title='Donate to worthy causes'>
					Fundraisers
				</Link>
				<Link to='/' title='Browse our Services'>
					Services
				</Link>
				<Link to='/' title='See the Voting Information Centre'>
					Voting Information Centre
				</Link>
				<Link to='/' title='Explore our groups'>
					Groups
				</Link>
				<Link
					to='/'
					title='Read our blog, discover the resource centre and find job opportuniteis'
				>
					About
				</Link>
				<Link to='/' title='Advertise on Facebook'>
					Create Ad
				</Link>
				<Link to='/' title='Create a page'>
					Create Page
				</Link>
				<Link to='/' title='Develop on our Platform'>
					Developers
				</Link>
				<Link
					to='/'
					title='Make your next career move to our brilliant company'
				>
					Careers
				</Link>
				<Link to='/' title='Learn more about your privacy on Facebook'>
					Privacy
				</Link>
				<Link to='/' title='Learn more about cookies on Facebook'>
					Cookies
				</Link>
				<Link to='/' title='Learn about AdChoices'>
					AdChoices
				</Link>
				<Link to='/' title='Learn about our terms and policies'>
					Terms
				</Link>
				<Link to='/' title='Visit our help centre'>
					Help
				</Link>
				<Link
					to='/'
					title='Visit our Contact uploading and non-users notice'
				>
					Contact uploading and non-users
				</Link>
			</div>
			<div className={classes.login_footer_wrap}>
				Meta &copy; {new Date().getFullYear()}
			</div>
		</footer>
	);
};

export default LoginFooter;
