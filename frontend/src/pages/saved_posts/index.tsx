import { useEffect } from 'react';
import HomeLayout from 'src/components/partials/HomeLayout';
import Post from 'src/components/post/Post';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { getSavedPosts } from 'src/state/post/api';
import classes from './saved.module.scss';

const SavedPosts = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.user);
	const { savedPosts } = useAppSelector(state => state.post);

	useEffect(() => {
		dispatch(getSavedPosts({ token: user?.token }));
	}, [dispatch, user?.token]);

	const { saved_posts } = classes;

	return (
		<HomeLayout>
			<div className={saved_posts}>
				<h3>Saved Posts</h3>
				<p>Posts you add to save will be listed here.</p>
			</div>
			{savedPosts?.map(post => (
				<Post post={post} user={user} key={post._id} />
			))}
		</HomeLayout>
	);
};

export default SavedPosts;
