import { ClipLoader } from 'react-spinners';
import { ActivateAccountProps } from 'src/interfaces/home';
import classes from './home.module.scss';

const ActivateForm: React.FC<ActivateAccountProps> = ({
	status,
	errorMsg,
	successMsg,
}) => {
	const { popup, popup_header, popup_message } = classes;

	return status === 'loading' ? (
		<div className='blur'>
			<div className={popup}>
				<ClipLoader color='#000' size={25} />
			</div>
		</div>
	) : (
		<div className='blur'>
			<div className={popup}>
				<div
					className={`${popup_header} ${
						status === 'succeeded' ? 'success_text' : 'error_text'
					}`}
				>
					{status === 'succeeded' ? successMsg : errorMsg}
				</div>
				<div className={popup_message}>
					{status === 'succeeded' &&
						'You will be redirected to Homepage.'}
				</div>
			</div>
		</div>
	);
};

export default ActivateForm;
