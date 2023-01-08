import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from 'src/components/header';
import ActivateForm from 'src/components/home/ActivateForm';
import LeftHome from 'src/components/home/left';
import RightHome from 'src/components/home/right';
import Stories from 'src/components/home/stories';
import CreatePost from 'src/components/post/create';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { verifyAccount } from 'src/state/user/api';
import classes from './home.module.scss';

const Activate: React.FC<{
	setPostPopupVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setPostPopupVisibility }) => {
	const { user, status, errorMsg, successMsg } = useAppSelector(
		state => state.user
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { token } = useParams();

	useEffect(() => {
		dispatch(verifyAccount({ token }));
	}, [dispatch, token]);

	useEffect(() => {
		let timer = setTimeout(() => {
			if (status === 'succeeded') {
				navigate('/');
			}
		}, 3000);

		return () => clearTimeout(timer);
	}, [navigate, status]);

	const { home, home_middle } = classes;

	return (
		<div className={home}>
			<ActivateForm
				status={status}
				errorMsg={errorMsg}
				successMsg={successMsg}
			/>
			<Header />
			<LeftHome user={user} />
			<div className={home_middle}>
				<Stories />
				<CreatePost
					user={user}
					setPostPopupVisibility={setPostPopupVisibility}
				/>
			</div>
			<RightHome user={user} />
		</div>
	);
};

export default Activate;
