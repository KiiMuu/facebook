import { useMediaQuery } from 'react-responsive';
import { ArrowRight, Plus } from 'src/svg';
import { homeStories } from 'src/data/home';
import classes from '../home.module.scss';
import Story from './Story';

const Stories: React.FC = () => {
	const query1175px = useMediaQuery({
		query: '(max-width: 1175px)',
	});
	const query1030px = useMediaQuery({
		query: '(max-width: 1030px)',
	});
	const query960px = useMediaQuery({
		query: '(max-width: 960px)',
	});
	const query885px = useMediaQuery({
		query: '(max-width: 885px)',
	});

	const max = query885px
		? 5
		: query960px
		? 4
		: query1030px
		? 5
		: query1175px
		? 4
		: homeStories.length;

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
			{homeStories.slice(0, max).map((story, i) => (
				<Story key={i} storyItem={story} />
			))}
			<div className={white_circle}>
				<ArrowRight color='#65676b' />
			</div>
		</div>
	);
};

export default Stories;
