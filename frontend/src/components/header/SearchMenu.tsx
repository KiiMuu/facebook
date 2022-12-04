import { useRef, useState, useEffect } from 'react';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import { Return, Search } from 'src/svg';
import classes from './header.module.scss';

const SearchMenu: React.FC<any> = ({ setShowSearchMenu }) => {
	const [iconVisible, setIconVisible] = useState(true);
	const menuEl = useRef(null);
	const inputEl = useRef<HTMLInputElement | null>(null);

	useDetectOutsideClicks(menuEl, () => setShowSearchMenu(false));

	useEffect(() => {
		let input = inputEl?.current;

		input?.focus();

		return () => {
			input?.blur();
		};
	}, []);

	const {
		header_left,
		search_area,
		scrollbar,
		search_wrap,
		header_logo,
		circle,
		search,
		search_history_header,
		search_history,
		search_results_scrollbar,
	} = classes;

	return (
		<div
			className={`${header_left} ${search_area} ${scrollbar}`}
			ref={menuEl}
		>
			<div className={search_wrap}>
				<div
					className={header_logo}
					onClick={() => setShowSearchMenu(false)}
				>
					<div className={`${circle} hover1`}>
						<Return color='#65676b' />
					</div>
				</div>
				<div
					className={search}
					onClick={() => inputEl?.current?.focus()}
				>
					{iconVisible && (
						<div>
							<Search color='#65676b' />
						</div>
					)}
					<input
						type='text'
						placeholder='Search Facebook'
						ref={inputEl}
						onFocus={() => setIconVisible(false)}
						onBlur={() => setIconVisible(true)}
					/>
				</div>
			</div>
			<div className={search_history_header}>
				<span>Recent searches</span>
				<button>Edit</button>
			</div>
			<div className={search_history}></div>
			<div className={search_results_scrollbar}></div>
		</div>
	);
};

export default SearchMenu;
