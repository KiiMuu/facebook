import { GenderSelectProps } from 'src/interfaces/inputs';
import classes from '../../pages/login/login.module.scss';

const GenderSelect: React.FC<GenderSelectProps> = ({
	genderError,
	handleChange,
}) => {
	return (
		<div className={classes.reg_grid}>
			<label
				htmlFor='male'
				style={{ borderColor: genderError ? '#b94a40' : '' }}
			>
				Male
				<input
					type='radio'
					name='gender'
					id='male'
					value='male'
					onChange={handleChange}
				/>
			</label>
			<label
				htmlFor='female'
				style={{ borderColor: genderError ? '#b94a40' : '' }}
			>
				Female
				<input
					type='radio'
					name='gender'
					id='female'
					value='female'
					onChange={handleChange}
				/>
			</label>
			{genderError ? (
				<div className={classes.input_error}>{genderError}</div>
			) : null}
		</div>
	);
};

export default GenderSelect;
