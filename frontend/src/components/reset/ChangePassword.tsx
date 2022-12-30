import { useRef } from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import LoginInput from 'src/components/inputs/loginInput';
import { IChangePassword } from 'src/interfaces/user';
import classes from 'src/pages/reset/reset.module.scss';
import { validatePasswords } from 'src/utils/inputsValidations';

const ChangePassword: React.FC<IChangePassword> = ({
	errorMsg,
	handlePasswordChange,
	email,
}) => {
	const formikRef = useRef<any>(null);

	const onSubmit = () => {
		let { password } = formikRef.current?.values;

		handlePasswordChange(email, password);
	};

	const {
		reset_form,
		reset_form_header,
		reset_text,
		reset_form_btns,
		error_msg,
	} = classes;

	return (
		<div className={reset_form} style={{ height: '400px' }}>
			<div className={reset_form_header}>Change password</div>
			<div className={reset_text}>Provide a strong password.</div>
			<Formik
				initialValues={{ password: '', confirm_password: '' }}
				enableReinitialize
				validationSchema={validatePasswords}
				innerRef={formikRef}
				onSubmit={onSubmit}
			>
				{({ values, handleChange, handleSubmit, handleBlur }) => (
					<Form onSubmit={handleSubmit}>
						<LoginInput
							type='password'
							name='password'
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='New password'
						/>
						<LoginInput
							type='password'
							name='confirm_password'
							value={values.confirm_password}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='New confirmed password'
						/>
						{errorMsg && (
							<span className={`error_text ${error_msg}`}>
								{errorMsg}
							</span>
						)}
						<div className={reset_form_btns}>
							<Link to='/login' className='gray_btn'>
								Cancel
							</Link>
							<button type='submit' className='blue_btn'>
								Continue
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ChangePassword;
