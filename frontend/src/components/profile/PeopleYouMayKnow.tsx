import { Dots } from 'src/svg';
import { homeStories } from 'src/data/home';
import classes from '../../pages/profile/profile.module.scss';
import AddFriendCard from './AddFriendCard';

const PeopleYouMayKnow = () => {
	const {
		pplyoumayknow,
		header,
		header_right,
		ppl_circle,
		pplyoumayknow_list,
	} = classes;

	return (
		<div className={pplyoumayknow}>
			<div className={header}>
				<span>People You May Know</span>
				<div className={`${header_right} ${ppl_circle} hover1`}>
					<Dots color='' />
				</div>
			</div>
			<div className={pplyoumayknow_list}>
				{homeStories.map((person, i) => (
					<AddFriendCard key={i} person={person} />
				))}
			</div>
		</div>
	);
};

export default PeopleYouMayKnow;
