import { Link } from 'react-router-dom';
import { SearchedUser } from 'src/interfaces/user';
import classes from 'src/pages/reset/reset.module.scss';

const SendEmail: React.FC<SearchedUser> = ({
	foundUser,
	sendEmailToResetPassword,
	errorMsg,
}) => {
	const {
		reset_form,
		reset_form_header,
		dynamic_height,
		reset_grid,
		reset_left,
		reset_right,
		reset_form_text,
		label_col,
		reset_form_btns,
		error_msg,
	} = classes;

	return (
		<div className={`${reset_form} ${dynamic_height}`}>
			<div className={reset_form_header}>Reset your password</div>
			<div className={reset_grid}>
				<div className={reset_left}>
					<div className={reset_form_text}>
						How do you want to recieve the code to reset your
						password?
					</div>
					<label htmlFor='email' className='hover1'>
						<input
							type='radio'
							name=''
							id='email'
							checked
							readOnly
						/>
						<div className={label_col}>
							<span>Send code via email: </span>
							<span>{foundUser?.email}</span>
						</div>
					</label>
				</div>
				<div className={reset_right}>
					<img src={foundUser?.picture} alt='User' />
					<span>{foundUser?.email}</span>
					<span>Facebook user</span>
				</div>
			</div>
			{errorMsg && (
				<span className={`error_text ${error_msg}`}>{errorMsg}</span>
			)}
			<div className={reset_form_btns}>
				<Link to='/login' className='gray_btn'>
					Not you?
				</Link>
				<button
					type='submit'
					className='blue_btn'
					onClick={() => sendEmailToResetPassword(foundUser?.email)}
				>
					Continue
				</button>
			</div>
		</div>
	);
};

export default SendEmail;
