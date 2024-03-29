import { Link } from 'react-router-dom';
import { LeftLinkProps } from 'src/interfaces/home';
import classes from '../home.module.scss';

const LeftLink: React.FC<LeftLinkProps> = ({
	img,
	text,
	notification,
	url,
}) => {
	const { left_link, col, col_1, col_2 } = classes;

	return (
		<div className={`${left_link} hover1`}>
			<img src={`/menus/${img}.png`} alt={img} />
			{url ? (
				<span>
					<Link to={url}>{text}</Link>
				</span>
			) : notification !== undefined ? (
				<div className={col}>
					<div className={col_1}>{text}</div>
					<div className={col_2}>{notification}</div>
				</div>
			) : (
				<span>{text}</span>
			)}
		</div>
	);
};

export default LeftLink;
