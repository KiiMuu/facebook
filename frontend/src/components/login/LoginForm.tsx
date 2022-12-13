import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import LoginInput from 'src/components/inputs/loginInput';
import classes from '../../pages/login/login.module.scss';
import { loginValidation } from 'src/utils/inputsValidations';
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { login } from 'src/state/user/api';

interface Props {
	setRegisterFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<Props> = ({ setRegisterFormVisible }) => {
	const formikRef = useRef<any>(null);
	const navigate = useNavigate();

	// state!
	const dispatch = useAppDispatch();
	const { status, errors, user } = useAppSelector(state => state.user);

	const loginSubmit = async () => {
		let { email, password } = formikRef.current?.values;

		try {
			const res = await dispatch(
				login({
					email,
					password,
				})
			).unwrap();

			Cookies.set('fb_user', JSON.stringify(res), {
				expires: 7,
				sameSite: 'none',
			});
		} catch (error) {
			console.log({ error });
		}
	};

	const onSubmit = async () => {
		await loginSubmit();
	};

	useEffect(() => {
		if (status === 'succeeded') {
			navigate('/');
		}
	}, [status, navigate, user]);

	return (
		<div className={classes.login_wrap}>
			<div className={classes.login_1}>
				<img src='icons/facebook.svg' alt='fb logo' />
				<span>
					Facebook helps you connect and share with the people in your
					life.
				</span>
			</div>
			<div className={classes.login_2}>
				<div className={classes.login_2_wrap}>
					<Formik
						initialValues={{ email: '', password: '' }}
						validationSchema={loginValidation}
						enableReinitialize
						innerRef={formikRef}
						onSubmit={onSubmit}
					>
						{({
							values,
							handleChange,
							handleSubmit,
							handleBlur,
						}) => (
							<Form onSubmit={handleSubmit}>
								<LoginInput
									type='text'
									name='email'
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Email address or phone number'
								/>
								<LoginInput
									type='password'
									name='password'
									placeholder='Password'
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									bottom
								/>

								<button type='submit' className='blue_btn'>
									{status === 'loading' ? (
										<ClipLoader color='#fff' size={25} />
									) : (
										'Log In'
									)}
								</button>
							</Form>
						)}
					</Formik>
					<Link to='/forgot' className={classes.forgot_pass}>
						Forgotten password?
					</Link>
					{status === 'failed' && (
						<ul className={classes.errors_list}>
							{errors?.map((i: number, error: Error) => (
								<li key={i}>{error.message}</li>
							))}
						</ul>
					)}
					<div className={classes.sign_splitter}></div>
					<button
						className='blue_btn open_signup'
						onClick={() => setRegisterFormVisible(true)}
					>
						Create New Account
					</button>
				</div>
				<Link to='/' className={classes.sign_extra}>
					<b>Create a Page</b> for a celebrity, brand or business.
				</Link>
			</div>
		</div>
	);
};

export default LoginForm;
