import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { resendVerificationCode } from 'src/state/user/api';
import classes from './verify.module.scss';

const ResendVerificationCode = () => {
	const dispatch = useAppDispatch();
	const { status, successMsg, errorMsg, user } = useAppSelector(
		state => state.user
	);

	const sendVerifyCode = async () => {
		dispatch(resendVerificationCode({ token: user!.token }));
	};

	const { send_verification } = classes;

	return (
		<div className={send_verification}>
			<span>
				Your account is not verified. Verify your account before it gets
				deleted after a month from creating.
			</span>
			<button onClick={() => sendVerifyCode()}>
				Click here to re-send verification link.
			</button>
			{status === 'loading' && <div>Loading...</div>}
			{status === 'succeeded' && (
				<div className='success_text'>{successMsg}</div>
			)}
			{status === 'failed' && (
				<div className='error_text'>{errorMsg}</div>
			)}
		</div>
	);
};

export default ResendVerificationCode;
