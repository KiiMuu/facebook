import { useState } from 'react';
import classes from './login.module.scss';
import LoginForm from 'src/components/login/LoginForm';
import RegisterForm from 'src/components/login/RegisterForm';
import LoginFooter from 'src/components/login/LoginFooter';

const Login: React.FC = () => {
	const [registerFormVisible, setRegisterFormVisible] = useState(false);

	return (
		<div className={classes.login}>
			<div className={classes.login_wrapper}>
				<LoginForm setRegisterFormVisible={setRegisterFormVisible} />
				{registerFormVisible && (
					<RegisterForm
						setRegisterFormVisible={setRegisterFormVisible}
					/>
				)}
				<LoginFooter />
			</div>
		</div>
	);
};

export default Login;
