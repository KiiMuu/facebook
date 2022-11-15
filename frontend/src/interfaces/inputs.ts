export type InputProps = {
	name: string;
	type?: string;
	value?: string;
	bottom?: boolean;
	placeholder: string;
	onChange?: (value: any) => void;
	onBlur?: (value: any) => void;
};

export type BirthSelectProps = {
	bDay: number;
	days: number[];
	bMonth: number;
	months: number[];
	bYear: number;
	years: number[];
	dateError: string;
	handleChange: {
		(e: React.ChangeEvent<any>): void;
		<T = string | React.ChangeEvent<any>>(
			field: T
		): T extends React.ChangeEvent<any>
			? void
			: (e: string | React.ChangeEvent<any>) => void;
	};
};

export type GenderSelectProps = {
	genderError: string;
	handleChange: {
		(e: React.ChangeEvent<any>): void;
		<T = string | React.ChangeEvent<any>>(
			field: T
		): T extends React.ChangeEvent<any>
			? void
			: (e: string | React.ChangeEvent<any>) => void;
	};
};
