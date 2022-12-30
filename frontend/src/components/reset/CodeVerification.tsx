import { Form, Formik } from 'formik';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import LoginInput from 'src/components/inputs/loginInput';
import { ICodeVerification } from 'src/interfaces/user';
import classes from 'src/pages/reset/reset.module.scss';
import { codeValidation } from 'src/utils/inputsValidations';

const CodeVerification: React.FC<ICodeVerification> = ({
	errorMsg,
	validateCode,
	email,
}) => {
	const formikRef = useRef<any>(null);

	const onSubmit = () => {
		let { code } = formikRef.current?.values;

		validateCode(email, code);
	};

	const {
		reset_form,
		reset_form_header,
		reset_text,
		reset_form_btns,
		error_msg,
	} = classes;

	return (
		<div className={reset_form}>
			<div className={reset_form_header}>Verification code</div>
			<div className={reset_text}>
				Please enter the code that has been sent to you.
			</div>
			<Formik
				initialValues={{ code: '' }}
				enableReinitialize
				validationSchema={codeValidation}
				innerRef={formikRef}
				onSubmit={onSubmit}
			>
				{({ values, handleChange, handleSubmit, handleBlur }) => (
					<Form onSubmit={handleSubmit}>
						<LoginInput
							type='text'
							name='code'
							value={values.code}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Verification code'
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

export default CodeVerification;
