import classes from './header.module.scss';

type ItemProps = {
	name: string;
	description: string;
	icon: string;
};

const AllMenuItem: React.FC<ItemProps> = ({ name, description, icon }) => {
	const { all_menu_item, all_menu_col } = classes;

	return (
		<div className={`${all_menu_item} hover1`}>
			<img src={`menus/${icon}.png`} alt={description} />
			<div className={all_menu_col}>
				<span>{name}</span>
				<span>{description}</span>
			</div>
		</div>
	);
};

export default AllMenuItem;
