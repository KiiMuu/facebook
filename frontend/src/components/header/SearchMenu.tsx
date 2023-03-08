import { useRef, useState, useEffect } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import {
	addToSearchHistory,
	deleteFromSearchHistory,
	getSearchHistories,
	searchFB,
} from 'src/state/user/api';
import { Return, Search } from 'src/svg';
import classes from './header.module.scss';

const SearchMenu: React.FC<any> = ({ setShowSearchMenu }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [iconVisible, setIconVisible] = useState(true);
	const menuEl = useRef(null);
	const inputEl = useRef<HTMLInputElement | null>(null);

	const dispatch = useAppDispatch();
	const {
		searchStatus,
		searchResults,
		user,
		searchHistoryFetchStatus,
		searchHistory,
	} = useAppSelector(state => state.user);

	useDetectOutsideClicks(menuEl, () => setShowSearchMenu(false));

	const handleAddUserToHistory = async (userId: string) => {
		try {
			await dispatch(
				addToSearchHistory({ token: user?.token, searchUser: userId })
			);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteFromHistory = async (id?: string) => {
		try {
			await dispatch(deleteFromSearchHistory({ token: user?.token, id }));

			dispatch(getSearchHistories({ token: user?.token }));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		let input = inputEl?.current;

		input?.focus();

		return () => {
			input?.blur();
		};
	}, []);

	useEffect(() => {
		let id: ReturnType<typeof setTimeout>;

		if (searchTerm.length > 2) {
			id = setTimeout(async () => {
				await dispatch(searchFB({ searchTerm, token: user?.token }));
			}, 500);
		}

		return () => {
			clearTimeout(id);
		};
	}, [dispatch, searchTerm, user?.token]);

	useEffect(() => {
		dispatch(getSearchHistories({ token: user?.token }));
	}, [dispatch, user?.token]);

	console.log({ searchHistory });

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
		users_wrapper,
		user_wrapper,
		user_info,
		loader,
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
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						onFocus={() => setIconVisible(false)}
						onBlur={() => setIconVisible(true)}
					/>
				</div>
			</div>
			{searchHistory.search.length ? (
				<div className={search_history_header}>
					<span>Recent searches</span>
					<button>Edit</button>
				</div>
			) : null}
			<div className={search_history}>
				{searchHistoryFetchStatus === 'loading' ? (
					<div className={loader}>
						<LoaderIcon />
					</div>
				) : !searchResults.length ? (
					<div className={users_wrapper}>
						{searchHistory?.search?.map(item => (
							<div key={item?.user?._id} className={user_wrapper}>
								<Link to={`/profile/${item.user?.username}`}>
									<img
										src={item?.user?.picture}
										alt={item?.user?.username}
										width='30px'
										height='30px'
									/>
									<div className={user_info}>
										<span>
											{item?.user?.firstName}{' '}
											{item.user?.lastName}
										</span>
										<span>{item?.user?.email}</span>
									</div>
								</Link>
								<i
									className='exit_icon'
									onClick={() =>
										handleDeleteFromHistory(item?._id)
									}
								></i>
							</div>
						))}
					</div>
				) : null}
			</div>
			<div className={search_results_scrollbar}>
				{searchStatus === 'loading' ? (
					<div className={loader}>
						<LoaderIcon />
					</div>
				) : !searchResults.length && !searchHistory?.search ? (
					<div>No results found.</div>
				) : searchResults.length > 0 ? (
					<div className={users_wrapper}>
						{searchResults.map(user => (
							<div key={user?._id} className={user_wrapper}>
								<Link
									to={`/profile/${user.username}`}
									onClick={() =>
										handleAddUserToHistory(user._id)
									}
								>
									<img
										src={user.picture}
										alt={user.username}
									/>
									<div className={user_info}>
										<span>
											{user.firstName} {user.lastName}
										</span>
										<span>{user.email}</span>
									</div>
								</Link>
							</div>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default SearchMenu;
