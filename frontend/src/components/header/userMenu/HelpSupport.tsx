import classes from '../header.module.scss';

const HelpSupport: React.FC<any> = ({ setVisible }) => {
	const { absolute_wrap, absolute_wrap_header, menu_item, circle } = classes;

	return (
		<div className={absolute_wrap}>
			<div className={absolute_wrap_header}>
				<div
					className={`${circle} hover1`}
					onClick={() => setVisible(0)}
				>
					<i className='arrow_back_icon'></i>
				</div>
				<span>Help & Support</span>
			</div>
			<div className={`${menu_item} hover3`}>
				<div className='small_circle'>
					<i className='help_center_icon'></i>
				</div>
				<span>Help Center</span>
			</div>
			<div className={`${menu_item} hover3`}>
				<div className='small_circle'>
					<i className='email_icon'></i>
				</div>
				<span>Support Inbox</span>
			</div>
			<div className={`${menu_item} hover3`}>
				<div className='small_circle'>
					<i className='info_filled_icon'></i>
				</div>
				<span>Report a Problem</span>
			</div>
		</div>
	);
};

export default HelpSupport;
