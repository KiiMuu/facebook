import { useAppSelector } from 'src/state/hooks';
import classes from './intro.module.scss';

const EditDetails: React.FC<{
	setShowEditDetails: (state: boolean) => void;
	details: IProfile['details'];
	maxChars: number;
	handleChange: (
		state: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void;
	handleUpdateDetails: () => void;
}> = ({
	setShowEditDetails,
	details,
	maxChars,
	handleChange,
	handleUpdateDetails,
}) => {
	const { status } = useAppSelector(state => state.user);

	const {
		infos_box,
		box_header,
		small_circle1,
		details_col,
		action_control,
		grid,
		remaining,
		actions_buttons,
		select,
	} = classes;

	return (
		<div className='blur'>
			<div className={`${infos_box} scrollbar`}>
				<div className={box_header}>
					<div
						className={`small_circle ${small_circle1}`}
						onClick={() => setShowEditDetails(false)}
					>
						<i className='exit_icon'></i>
					</div>
					<span>Update Your Details</span>
				</div>
				<div className={details_col}>
					<div className={action_control}>
						<label htmlFor='bio'>Bio</label>
						<textarea
							name='bio'
							id='bio'
							value={details.bio}
							placeholder='Say something descriptive about you.'
							maxLength={150}
							onChange={handleChange}
						></textarea>
						<span className={remaining}>
							{maxChars} remaining characters
						</span>
					</div>
					<div className={grid}>
						<div className={action_control}>
							<label htmlFor='nickname'>Nickname</label>
							<input
								type='text'
								id='nickname'
								name='otherName'
								value={details.otherName}
								placeholder='Type a nickname. eg. kimofolio'
								onChange={handleChange}
							/>
						</div>
						<div className={action_control}>
							<label htmlFor='job'>Job</label>
							<input
								type='text'
								id='job'
								name='job'
								value={details.job}
								placeholder="What\'s your job?"
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className={grid}>
						<div className={action_control}>
							<label htmlFor='workPlace'>Work Place</label>
							<input
								type='text'
								id='workPlace'
								name='workPlace'
								value={details.workPlace}
								placeholder='Where are you working?'
								onChange={handleChange}
							/>
						</div>
						<div className={action_control}>
							<label htmlFor='highSchool'>High School</label>
							<input
								type='text'
								id='highSchool'
								name='highSchool'
								value={details.highSchool}
								placeholder='High School?'
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className={grid}>
						<div className={action_control}>
							<label htmlFor='college'>College</label>
							<input
								type='text'
								id='college'
								name='college'
								value={details.college}
								placeholder='College'
								onChange={handleChange}
							/>
						</div>
						<div className={action_control}>
							<label htmlFor='currentCity'>City</label>
							<input
								type='text'
								id='currentCity'
								name='currentCity'
								value={details.currentCity}
								placeholder='Current City'
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className={grid}>
						<div className={action_control}>
							<label htmlFor='homeTown'>Home Town</label>
							<input
								type='text'
								id='homeTown'
								name='homeTown'
								value={details.homeTown}
								placeholder='Home Town'
								onChange={handleChange}
							/>
						</div>
						<div className={action_control}>
							<label htmlFor='relationship'>Relationship</label>
							<div className={select}>
								<select
									name='relationship'
									id='relationship'
									value={details.relationship}
									onChange={handleChange}
								>
									<option value=''>Select an Option</option>
									<option value='Single'>Single</option>
									<option value='In a relationship'>
										In a relationship
									</option>
									<option value='Married'>Married</option>
									<option value='Divorced'>Divorced</option>
								</select>
							</div>
						</div>
					</div>
					<div className={action_control}>
						<label htmlFor='instagram'>Instagram</label>
						<input
							type='text'
							id='instagram'
							name='instagram'
							value={details.instagram}
							placeholder='Instagram username. eg. 12kimo_wow'
							onChange={handleChange}
						/>
					</div>
					<div className={actions_buttons}>
						<button
							className='gray_btn'
							onClick={() => setShowEditDetails(false)}
							disabled={status === 'loading'}
							style={{
								cursor:
									status === 'loading' ? 'wait' : 'pointer',
								opacity: status === 'loading' ? 0.5 : 1,
							}}
						>
							Cancel
						</button>
						<button
							type='submit'
							className='blue_btn'
							style={{
								cursor:
									status === 'loading' ? 'wait' : 'pointer',
								opacity: status === 'loading' ? 0.5 : 1,
							}}
							onClick={() => handleUpdateDetails()}
						>
							{status === 'loading' ? 'Saving...' : 'Save'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditDetails;
