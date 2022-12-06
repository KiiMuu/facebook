import { ShortcutProps } from 'src/interfaces/home';
import classes from '../home.module.scss';

const Shortcut: React.FC<ShortcutProps> = ({ link, img, name }) => {
	const { shortcut_item } = classes;

	return (
		<a
			href={link}
			target='_blank'
			rel='noreferrer'
			className={`${shortcut_item} hover1`}
		>
			<img src={img} alt={name} />
			<span>{name}</span>
		</a>
	);
};

export default Shortcut;
