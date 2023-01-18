import { useEffect, useRef, useState } from 'react';
import Header from 'src/components/header';
import LeftHome from 'src/components/home/left';
import RightHome from 'src/components/home/right';
import ResendVerificationCode from 'src/components/home/sendVerifyCode';
import Stories from 'src/components/home/stories';
import Posts from 'src/components/post';
import CreatePost from 'src/components/post/create';
import { useAppSelector } from 'src/state/hooks';
import classes from './home.module.scss';

const Home: React.FC<{
	setPostPopupVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setPostPopupVisibility }) => {
	const [height, setHeight] = useState<number>(0);
	const middleRef = useRef<HTMLDivElement>(null);
	const { user } = useAppSelector(state => state.user);
	const { status: postsStatus } = useAppSelector(state => state.post);

	useEffect(() => {
		if (postsStatus === 'succeeded') {
			setHeight(middleRef.current!.clientHeight);
		}
	}, [postsStatus]);

	const { home, home_middle } = classes;

	return (
		<div className={home} style={{ height: `${height + 100}px` }}>
			<Header page='home' />
			<LeftHome user={user} />
			<div className={home_middle} ref={middleRef}>
				<Stories />
				{!user?.verified && <ResendVerificationCode />}
				<CreatePost
					user={user}
					setPostPopupVisibility={setPostPopupVisibility}
				/>
				<Posts />
			</div>
			<RightHome user={user} />
		</div>
	);
};

export default Home;
