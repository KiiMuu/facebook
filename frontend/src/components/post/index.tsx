import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { getAllPosts } from 'src/state/post/api';
import Post from './Post';
import classes from './posts.module.scss';

const Posts = () => {
	const dispatch = useAppDispatch();

	const { user } = useAppSelector(state => state.user);
	const { posts } = useAppSelector(state => state.post);

	useEffect(() => {
		dispatch(getAllPosts({ token: user?.token }));
	}, [dispatch, user?.token]);

	const { posts_wrap } = classes;

	return (
		<div className={posts_wrap}>
			{posts.map(post => (
				<Post key={post._id} post={post} user={user} />
			))}
		</div>
	);
};

export default Posts;
