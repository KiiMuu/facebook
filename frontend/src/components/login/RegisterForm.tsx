import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { IoCloseOutline } from 'react-icons/io5';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from 'js-cookie';
import classes from '../../pages/login/login.module.scss';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { register } from 'src/state/user/api';
import RegisterInput from '../inputs/registerInput';
import { registerValidation } from 'src/utils/inputsValidations';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';

interface Props {
	setRegisterFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<Props> = ({ setRegisterFormVisible }) => {
	const [bYear] = useState<number>(new Date().getFullYear());
	const [bMonth] = useState<number>(new Date().getMonth() + 1);
	const [dateError, setDateError] = useState('');
	const [genderError, setGenderError] = useState('');
	const formikRef = useRef<any>(null);
	const navigate = useNavigate();

	const years = Array.from(
		new Array(100),
		(val: number, index: number) => bYear - index
	);
	const months = Array.from(
		new Array(12),
		(val: number, index: number) => 1 + index
	);
	const getDays = () => {
		return new Date(bYear, bMonth, 0).getDate();
	};
	const days = Array.from(
		new Array(getDays()),
		(val: number, index: number) => 1 + index
	);

	// state!
	const dispatch = useAppDispatch();
	const { status, errors, successMsg, user } = useAppSelector(
		state => state.user
	);

	const registerSubmit = async () => {
		let {
			firstName,
			lastName,
			email,
			password,
			bYear,
			bMonth,
			bDay,
			gender,
		} = formikRef.current?.values;

		try {
			let res = await dispatch(
				register({
					firstName,
					lastName,
					email,
					password,
					bYear,
					bMonth,
					bDay,
					gender,
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
		// I needed to access formik inputs values outside form scope
		// useRef hook comes in handy!
		let { bYear, bMonth, bDay, gender } = formikRef.current?.values;
		let currentDate = new Date();
		let pickedDate = new Date(bYear, bMonth - 1, bDay);
		let atLeast14 = new Date(1970 + 14, 0, 1);
		let atMost70 = new Date(1970 + 70, 0, 1);

		// ? plus operator converts it to number
		if (+currentDate - +pickedDate < +atLeast14) {
			setDateError(
				"It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
			);
		} else if (+currentDate - +pickedDate > +atMost70) {
			setDateError(
				"It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
			);
		} else if (gender === '') {
			setDateError('');
			setGenderError(
				'Please choose a gender. You can change who can see it later.'
			);
		} else {
			setDateError('');
			setGenderError('');
			registerSubmit();
		}
	};

	useEffect(() => {
		if (status === 'succeeded') {
			let timer = setTimeout(() => {
				navigate('/');
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [status, navigate, user]);

	return (
		<div className='blur'>
			<div className={classes.register}>
				<div className={classes.register_header}>
					<IoCloseOutline
						className={classes.exit_icon}
						size={23}
						title='Close'
						onClick={() => setRegisterFormVisible(false)}
					/>
					<span>Sign Up</span>
					<span>It's quick and easy.</span>
				</div>
				<Formik
					initialValues={{
						firstName: '',
						lastName: '',
						email: '',
						password: '',
						bYear: new Date().getFullYear(),
						bMonth: new Date().getMonth() + 1,
						bDay: new Date().getDate(),
						gender: '',
					}}
					enableReinitialize
					innerRef={formikRef}
					validationSchema={registerValidation}
					onSubmit={onSubmit}
				>
					{({ handleChange, handleSubmit, values }) => (
						<Form
							className={classes.register_form}
							onSubmit={handleSubmit}
						>
							<div className={classes.reg_line}>
								<RegisterInput
									type='text'
									placeholder='First name'
									name='firstName'
									value={values.firstName}
									onChange={handleChange}
									bottom
								/>
								<RegisterInput
									type='text'
									placeholder='Surname'
									name='lastName'
									value={values.lastName}
									onChange={handleChange}
									bottom
								/>
							</div>
							<div className={classes.reg_line}>
								<RegisterInput
									type='email'
									placeholder='Mobile number or email address'
									name='email'
									value={values.email}
									onChange={handleChange}
								/>
							</div>
							<div className={classes.reg_line}>
								<RegisterInput
									type='password'
									placeholder='New password'
									name='password'
									value={values.password}
									onChange={handleChange}
								/>
							</div>
							<div className={classes.reg_col}>
								<div className={classes.reg_line_header}>
									Date of birth{' '}
									<HiQuestionMarkCircle
										className={classes.info_icon}
										title='Click for more information'
									/>
								</div>
								<DateOfBirthSelect
									bDay={values.bDay}
									days={days}
									bMonth={values.bMonth}
									months={months}
									bYear={values.bYear}
									years={years}
									dateError={dateError}
									handleChange={handleChange}
								/>
							</div>
							<div
								className={classes.reg_col}
								style={{ marginTop: dateError ? '60px' : '' }}
							>
								<div className={classes.reg_line_header}>
									Gender{' '}
									<HiQuestionMarkCircle
										className={classes.info_icon}
										title='Click for more information'
									/>
								</div>
								<GenderSelect
									genderError={genderError}
									handleChange={handleChange}
								/>
							</div>
							<div
								className={classes.reg_info}
								style={{ marginTop: genderError ? '60px' : '' }}
							>
								<span>
									People who use our service may have uploaded
									your contact information to Facebook.{' '}
									<Link to='/'>Learn more.</Link>
								</span>{' '}
								<span>
									By clicking Sign Up, you agree to our{' '}
									<Link to='/'>Terms</Link>,{'  '}
									<Link to='/'>Privacy Policy</Link>
									{'  '} and {'  '}
									<Link to='/'>Cookies Policy</Link>. You may
									receive SMS notifications from us and can
									opt out at any time.
								</span>
							</div>
							<div className={classes.reg_btn_wrapper}>
								<button
									type='submit'
									className='blue_btn open_signup'
								>
									Sign Up
								</button>
							</div>
							<ClipLoader
								color='#1876f2'
								loading={status === 'loading'}
								size={30}
							/>
							{status === 'failed' && (
								<ul className={classes.errors_list}>
									{errors?.map((i: number, error: Error) => (
										<li key={i}>{error.message}</li>
									))}
								</ul>
							)}
							{status === 'succeeded' && (
								<div className={classes.success_msg}>
									{successMsg}
								</div>
							)}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default RegisterForm;
