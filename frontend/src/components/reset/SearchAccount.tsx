import { useRef } from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import LoginInput from 'src/components/inputs/loginInput';
import classes from 'src/pages/reset/reset.module.scss';
import { validateEmail } from 'src/utils/inputsValidations';
import { ISearchAccount } from 'src/interfaces/user';

const SearchAccount: React.FC<ISearchAccount> = ({
	searchForUser,
	errorMsg,
}) => {
	const formikRef = useRef<any>(null);

	const onSubmit = () => {
		let { email } = formikRef.current?.values;

		searchForUser(email);
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
			<div className={reset_form_header}>Find your account</div>
			<div className={reset_text}>
				Please enter your email address or mobile number to search for
				your account.
			</div>
			<Formik
				initialValues={{ email: '' }}
				enableReinitialize
				validationSchema={validateEmail}
				innerRef={formikRef}
				onSubmit={onSubmit}
			>
				{({ values, handleChange, handleSubmit, handleBlur }) => (
					<Form onSubmit={handleSubmit}>
						<LoginInput
							type='text'
							name='email'
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Email address or phone number'
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
								Find
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SearchAccount;
