import { IPostOptions } from 'src/interfaces/post';
import classes from './options.module.scss';

const Option: React.FC<IPostOptions> = ({ icon, title, subTitle, img }) => {
	const { option_text, menu_option_col } = classes;

	return (
		<li className='hover1'>
			{img ? <img src={img} alt={img} /> : <i className={icon}></i>}
			<div className={option_text}>
				<span>{title}</span>
				{subTitle && (
					<span className={menu_option_col}>{subTitle}</span>
				)}
			</div>
		</li>
	);
};

export default Option;
