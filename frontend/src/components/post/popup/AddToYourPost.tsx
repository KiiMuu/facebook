import { Dots, Feeling, Photo } from 'src/svg';
import classes from './popup.module.scss';

const AddToYourPost: React.FC<{
	setShowPrev: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowPrev }) => {
	const {
		add_to_your_post,
		more_post_options,
		add_to_text,
		post_header_right,
	} = classes;

	return (
		<div className={add_to_your_post}>
			<div className={add_to_text}>Add to your post</div>
			<div className={more_post_options}>
				<div
					className={`${post_header_right} hover1`}
					onClick={() => setShowPrev(true)}
				>
					<Photo color='#45bd62' />
				</div>
				<div className={`${post_header_right} hover1`}>
					<i className='tag_icon'></i>
				</div>
				<div className={`${post_header_right} hover1`}>
					<Feeling color='#f7b928' />
				</div>
				<div className={`${post_header_right} hover1`}>
					<i className='maps_icon'></i>
				</div>
				<div className={`${post_header_right} hover1`}>
					<i className='microphone_icon'></i>
				</div>
				<div className={`${post_header_right} hover1`}>
					<Dots color='#65676b' />
				</div>
			</div>
		</div>
	);
};

export default AddToYourPost;
