import classes from '../header.module.scss';

const DisplayAccessibility: React.FC<any> = ({ setVisible }) => {
	const {
		absolute_wrap,
		absolute_wrap_header,
		circle,
		user_menu_main,
		user_menu_col,
		menu_span1,
		menu_span2,
		user_menu_item,
		rArrow,
	} = classes;

	return (
		<div className={absolute_wrap}>
			<div className={absolute_wrap_header} onClick={() => setVisible(0)}>
				<div className={`${circle} hover1`}>
					<i className='arrow_back_icon'></i>
				</div>
				<span>Display & Accessibility</span>
			</div>
			<div className={`${user_menu_main} hover3`}>
				<div className='small_circle' style={{ width: '60px' }}>
					<i className='dark_filled_icon'></i>
				</div>
				<div className={user_menu_col}>
					<div className={menu_span1}>Dark Mode</div>
					<div className={menu_span2}>
						Adjust the appearance of Facebook to reduce glare and
						give your eyes a break.
					</div>
				</div>
			</div>
			<label htmlFor='darkOn' className='hover1'>
				<span>On</span>
				<input type='radio' name='dark' id='darkOn' />
			</label>
			<label htmlFor='darkOff' className='hover1'>
				<span>Off</span>
				<input type='radio' name='dark' id='darkOff' />
			</label>
			<div className={`${user_menu_main} hover3`}>
				<div className='small_circle' style={{ width: '50px' }}>
					<i className='compact_icon'></i>
				</div>
				<div className={user_menu_col}>
					<div className={menu_span1}>Compact Mode</div>
					<div className={menu_span2}>
						Make font size smaller so more content can fit on the
						screen.
					</div>
				</div>
			</div>
			<label htmlFor='compactOn' className='hover1'>
				<span>On</span>
				<input type='radio' name='compact' id='compactOn' />
			</label>
			<label htmlFor='compactOff' className='hover1'>
				<span>Off</span>
				<input type='radio' name='compact' id='compactOff' />
			</label>
			<div className={`${user_menu_item} hover3`}>
				<div className='small_circle'>
					<i className='keyboard_icon'></i>
				</div>
				<span>Keyboard</span>
				<div className={rArrow}>
					<i className='right_icon'></i>
				</div>
			</div>
		</div>
	);
};

export default DisplayAccessibility;
