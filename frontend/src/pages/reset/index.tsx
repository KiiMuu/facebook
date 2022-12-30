import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChangePassword from 'src/components/reset/ChangePassword';
import CodeVerification from 'src/components/reset/CodeVerification';
import SearchAccount from 'src/components/reset/SearchAccount';
import SendEmail from 'src/components/reset/SendEmail';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import {
	changePassword,
	findUser,
	sendResetPasswordEmail,
	validateResetCode,
} from 'src/state/user/api';
import classes from './reset.module.scss';

const Reset = () => {
	const [visible, setVisible] = useState(0);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { errorMsg, foundUser, successMsg } = useAppSelector(
		state => state.user
	);

	const searchForUser = async (email: string) => {
		try {
			await dispatch(findUser({ email })).unwrap();

			setVisible(prev => prev + 1);
		} catch (error) {
			setVisible(prev => prev);
		}
	};

	const sendEmailToResetPassword = async (email: string) => {
		try {
			await dispatch(sendResetPasswordEmail({ email })).unwrap();

			setVisible(prev => prev + 1);
		} catch (error) {
			setVisible(prev => prev);
		}
	};

	const validateCode = async (email: string, code: number) => {
		try {
			await dispatch(validateResetCode({ email, code })).unwrap();

			setVisible(prev => prev + 1);
		} catch (error) {
			setVisible(prev => prev);
		}
	};

	const handlePasswordChange = async (email: string, password: string) => {
		try {
			await dispatch(changePassword({ email, password })).unwrap();

			navigate('/login');
		} catch (error) {
			setVisible(prev => prev);
		}
	};

	const { reset, reset_header, right_reset, reset_wrap } = classes;

	return (
		<div className={reset}>
			<div className={reset_header}>
				<img src='icons/facebook.svg' alt='fb logo' />
				<Link to='/login' className={right_reset}>
					<button className='blue_btn'>Login</button>
				</Link>
			</div>
			<div className={reset_wrap}>
				{visible === 0 && (
					<SearchAccount
						searchForUser={searchForUser}
						errorMsg={errorMsg}
					/>
				)}
				{visible === 1 && foundUser && (
					<SendEmail
						foundUser={foundUser}
						sendEmailToResetPassword={sendEmailToResetPassword}
						errorMsg={errorMsg}
					/>
				)}
				{visible === 2 && (
					<CodeVerification
						successMsg={successMsg}
						errorMsg={errorMsg}
						validateCode={validateCode}
						email={foundUser!?.email} // ! sign ensure that email cannot be undefined here
					/>
				)}
				{visible === 3 && (
					<ChangePassword
						handlePasswordChange={handlePasswordChange}
						successMsg={successMsg}
						errorMsg={errorMsg}
						email={foundUser!?.email}
					/>
				)}
			</div>
		</div>
	);
};

export default Reset;
