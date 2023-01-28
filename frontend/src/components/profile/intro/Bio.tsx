import classes from './intro.module.scss';

const Bio: React.FC<{
	details: IProfile['details'];
	maxChars: number;
	setShowBio: (state: boolean) => void;
	handleChange: (
		state: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleUpdateDetails: () => void;
}> = ({ details, maxChars, setShowBio, handleChange, handleUpdateDetails }) => {
	const { bio_wrap, remaining, actions } = classes;

	return (
		<div className={bio_wrap}>
			<textarea
				name='bio'
				value={details.bio}
				placeholder='Say something descriptive about you.'
				maxLength={150}
				onChange={handleChange}
			></textarea>
			<span className={remaining}>{maxChars} remaining characters</span>
			<div className={actions}>
				<button className='gray_btn' onClick={() => setShowBio(false)}>
					Cancel
				</button>
				<button
					className='blue_btn'
					onClick={() => handleUpdateDetails()}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default Bio;
