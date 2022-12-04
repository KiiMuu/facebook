import { menu, create } from 'src/data/allMenu';
import { Search } from 'src/svg';
import AllMenuItem from './AllMenuItem';
import classes from './header.module.scss';

const AllMenu = () => {
	const {
		all_menu,
		all_menu_header,
		all_menu_wrap,
		all_menu_left,
		all_menu_search,
		all_menu_group,
		all_menu_group_header,
		all_menu_right,
		all_menu_right_header,
		all_menu_right_item,
		all_right_circle,
	} = classes;

	return (
		<div className={all_menu}>
			<div className={all_menu_header}>Menu</div>
			<div className={`${all_menu_wrap} scrollbar`}>
				<div className={all_menu_left}>
					<div className={all_menu_search}>
						<Search color='#65676b' />
						<input type='text' placeholder='Search Menu' />
					</div>
					<div className={all_menu_group}>
						<div className={all_menu_group_header}>Social</div>
						{menu.slice(0, 6).map((item, i) => (
							<AllMenuItem
								key={i}
								name={item.name}
								icon={item.icon}
								description={item.description}
							/>
						))}
					</div>
					<div className={all_menu_group}>
						<div className={all_menu_group_header}>
							Entertainments
						</div>
						{menu.slice(6, 9).map((item, i) => (
							<AllMenuItem
								key={i}
								name={item.name}
								icon={item.icon}
								description={item.description}
							/>
						))}
					</div>
					<div className={all_menu_group}>
						<div className={all_menu_group_header}>Shopping</div>
						{menu.slice(9, 11).map((item, i) => (
							<AllMenuItem
								key={i}
								name={item.name}
								icon={item.icon}
								description={item.description}
							/>
						))}
					</div>
					<div className={all_menu_group}>
						<div className={all_menu_group_header}>Personal</div>
						{menu.slice(11, 15).map((item, i) => (
							<AllMenuItem
								key={i}
								name={item.name}
								icon={item.icon}
								description={item.description}
							/>
						))}
					</div>
					<div className={all_menu_group}>
						<div className={all_menu_group_header}>
							Professionals
						</div>
						{menu.slice(15, 17).map((item, i) => (
							<AllMenuItem
								key={i}
								name={item.name}
								icon={item.icon}
								description={item.description}
							/>
						))}
					</div>
					<div className={all_menu_group}>
						<div className={all_menu_group_header}>
							Community Resources
						</div>
						{menu.slice(17, 21).map((item, i) => (
							<AllMenuItem
								key={i}
								name={item.name}
								icon={item.icon}
								description={item.description}
							/>
						))}
					</div>
					<div className={all_menu_group}>
						<div className={all_menu_group_header}>
							More from Meta.
						</div>
						{menu.slice(21, menu.length).map((item, i) => (
							<AllMenuItem
								key={i}
								name={item.name}
								icon={item.icon}
								description={item.description}
							/>
						))}
					</div>
				</div>
				<div className={all_menu_right}>
					<div className={all_menu_right_header}>Create</div>
					{create.map((item, i) => (
						<div className={all_menu_right_item} key={i}>
							<div className={all_right_circle}>
								<i className={item.icon}></i>
							</div>
							{item.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AllMenu;
