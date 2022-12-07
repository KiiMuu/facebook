import { useMediaQuery } from 'react-responsive';
import { Feeling, LiveVideo, Photo } from 'src/svg';
import classes from './create.module.scss';

const CreatePost: React.FC<{ user: UserInfo | null }> = ({ user }) => {
	const query500px = useMediaQuery({
		query: '(max-width: 500px)',
	});

	const {
		create_post,
		create_post_header,
		open_post,
		create_splitter,
		create_post_body,
		create_post_icon,
	} = classes;

	return (
		<div className={create_post}>
			<div className={create_post_header}>
				<img src={user?.picture} alt={user?.username} />
				<div className={`${open_post} hover2`}>
					What's on your mind, {user?.firstName}?
				</div>
			</div>
			<div className={create_splitter}></div>
			<div className={create_post_body}>
				<div className={`${create_post_icon} hover1`}>
					<LiveVideo color='#f3425f' /> Live{' '}
					{query500px ? null : 'Video'}
				</div>
				<div className={`${create_post_icon} hover1`}>
					<Photo color='#4bbf67' /> Photo{' '}
					{query500px ? null : '/ Video'}
				</div>
				<div className={`${create_post_icon} hover1`}>
					<Feeling color='#f2b920' /> Feeling{' '}
					{query500px ? null : '/ Activity'}
				</div>
			</div>
		</div>
	);
};

export default CreatePost;
