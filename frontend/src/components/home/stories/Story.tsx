import { StoryProps } from 'src/interfaces/home';
import classes from '../home.module.scss';

const Story: React.FC<{ storyItem: StoryProps }> = ({ storyItem }) => {
	const { story, story_profile_pic, story_profile_name } = classes;

	return (
		<div className={story}>
			<img src={storyItem.image} alt={storyItem.profile_name} />
			<div className={story_profile_pic}>
				<img
					src={storyItem.profile_picture}
					alt={storyItem.profile_name}
				/>
			</div>
			<div className={story_profile_name}>{storyItem.profile_name}</div>
		</div>
	);
};

export default Story;
