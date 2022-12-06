import classes from '../home.module.scss';

const Contact: React.FC<{ user: UserInfo | null }> = ({ user }) => {
	const { contact, contact_img } = classes;

	return (
		<div className={`${contact} hover1`}>
			<div className={contact_img}>
				<img src={user?.picture} alt={user?.username} />
			</div>
			<span>
				{user?.firstName} {user?.lastName}
			</span>
		</div>
	);
};

export default Contact;
