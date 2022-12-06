import Contact from './Contact';
import { Dots, NewRoom, Search } from 'src/svg';
import classes from '../home.module.scss';

const RightHome: React.FC<{ user: UserInfo | null }> = ({ user }) => {
	const {
		right_home,
		sponsored,
		splitter1,
		contacts_wrap,
		contacts_header,
		contacts_header_right,
		contacts_header_left,
		contact_circle,
		contacts_list,
	} = classes;

	return (
		<div className={right_home}>
			<div className={sponsored}>Sponsored</div>
			<div className={splitter1}></div>
			<div className={contacts_wrap}>
				<div className={contacts_header}>
					<div className={contacts_header_left}>Contacts</div>
					<div className={contacts_header_right}>
						<div className={`${contact_circle} hover1`}>
							<NewRoom color='' />
						</div>
						<div className={`${contact_circle} hover1`}>
							<Search color='' />
						</div>
						<div className={`${contact_circle} hover1`}>
							<Dots color='' />
						</div>
					</div>
				</div>
				<div className={contacts_list}>
					<Contact user={user} />
				</div>
			</div>
		</div>
	);
};

export default RightHome;
