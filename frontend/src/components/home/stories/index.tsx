import { ArrowRight, Plus } from 'src/svg';
import { homeStories } from 'src/data/home';
import classes from '../home.module.scss';
import Story from './Story';

const Stories: React.FC = () => {
	const {
		stories,
		create_story_card,
		plus_story,
		story_create_text,
		white_circle,
	} = classes;

	return (
		<div className={stories}>
			<div className={create_story_card}>
				<img src='/images/default_pic.png' alt='user' />
				<div className={plus_story}>
					<Plus color='#fff' />
				</div>
				<div className={story_create_text}>Create Story</div>
			</div>
			{homeStories.map((story, i) => (
				<Story key={i} storyItem={story} />
			))}
			<div className={white_circle}>
				<ArrowRight color='#65676b' />
			</div>
		</div>
	);
};

export default Stories;
