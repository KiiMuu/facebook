import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Header from '../header';
import LeftHome from '../home/left';
import RightHome from '../home/right';
import classes from 'src/pages/home/home.module.scss';
import { useAppSelector } from 'src/state/hooks';

const HomeLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [height, setHeight] = useState<number>(0);
	const middleRef = useRef<HTMLDivElement>(null);
	const { user } = useAppSelector(state => state.user);
	const { status } = useAppSelector(state => state.post);

	useEffect(() => {
		if (status === 'succeeded') {
			setHeight(middleRef.current!.clientHeight);
		}

		if (window.location.pathname !== '/') {
			setHeight(100);
		}
	}, [status, height]);

	const { home, home_middle } = classes;

	return (
		<div
			className={home}
			style={{
				height: `${height + 100}${
					window.location.pathname !== '/' ? 'vh' : 'px'
				}`,
			}}
		>
			<Header page='home' />
			<LeftHome user={user} />
			<div className={home_middle} ref={middleRef}>
				{children}
			</div>
			<RightHome user={user} />
		</div>
	);
};

export default HomeLayout;
