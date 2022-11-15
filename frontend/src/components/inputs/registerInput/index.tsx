import { ErrorMessage, useField } from 'formik';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { InputProps } from 'src/interfaces/inputs';
import classes from './registerInput.module.scss';

const RegisterInput: React.FC<InputProps> = ({
	placeholder,
	bottom = false,
	...props
}) => {
	const [field, meta] = useField(props);

	return (
		<div className={classes.input_wrap}>
			{meta.touched && meta.error && !bottom ? (
				<div
					className={classes.input_error}
					style={{ transform: 'translateY(3px)' }}
				>
					{meta.touched && meta.error && (
						<ErrorMessage name={field.name} component='span' />
					)}
					{meta.touched && meta.error && (
						<div className={classes.error_arrow_top}></div>
					)}
				</div>
			) : null}
			<div className={classes.input_iconed}>
				<input
					className={
						meta.touched && meta.error
							? classes.input_error_border
							: ''
					}
					{...field}
					{...props}
					placeholder={placeholder}
				/>
				{meta.touched && meta.error ? (
					<AiFillExclamationCircle className={classes.error_icon} />
				) : null}
			</div>
			{meta.touched && meta.error && bottom ? (
				<div
					className={classes.input_error}
					style={{ transform: 'translateY(2px)' }}
				>
					{meta.touched && meta.error && (
						<ErrorMessage name={field.name} component='span' />
					)}
					{meta.touched && meta.error && (
						<div className={classes.error_arrow_bottom}></div>
					)}
				</div>
			) : null}
		</div>
	);
};

export default RegisterInput;
