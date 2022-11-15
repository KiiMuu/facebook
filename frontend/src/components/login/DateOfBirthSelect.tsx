import { BirthSelectProps } from 'src/interfaces/inputs';
import classes from '../../pages/login/login.module.scss';

const DateOfBirthSelect: React.FC<BirthSelectProps> = ({
	bDay,
	days,
	bMonth,
	months,
	bYear,
	years,
	dateError,
	handleChange,
}) => {
	return (
		<div className={classes.reg_grid}>
			<select
				name='bDay'
				value={bDay}
				onChange={handleChange}
				style={{ borderColor: dateError ? '#b94a40' : '' }}
			>
				{days.map((day: number, i: number) => (
					<option value={day} key={i}>
						{day}
					</option>
				))}
			</select>
			<select
				name='bMonth'
				value={bMonth}
				onChange={handleChange}
				style={{ borderColor: dateError ? '#b94a40' : '' }}
			>
				{months.map((month: number, i: number) => (
					<option value={month} key={i}>
						{month}
					</option>
				))}
			</select>
			<select
				name='bYear'
				value={bYear}
				onChange={handleChange}
				style={{ borderColor: dateError ? '#b94a40' : '' }}
			>
				{years.map((year: number, i: number) => (
					<option value={year} key={i}>
						{year}
					</option>
				))}
			</select>
			{dateError ? (
				<div className={classes.input_error}>{dateError}</div>
			) : null}
		</div>
	);
};

export default DateOfBirthSelect;
