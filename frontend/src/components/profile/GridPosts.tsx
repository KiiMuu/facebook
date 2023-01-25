import postStyles from 'src/components/post/create/create.module.scss';

const GridPosts = () => {
	const {
		create_post,
		create_post_header,
		create_splitter,
		create_post_body,
		left_header_grid,
		grid_2,
		view_type,
		flex,
		create_post_profile,
	} = postStyles;

	return (
		<div className={`${create_post} ${create_post_profile}`}>
			<div
				className={create_post_header}
				style={{ justifyContent: 'space-between' }}
			>
				<div className={left_header_grid}>Posts</div>
				<div className={flex}>
					<div className='gray_btn'>
						<i className='equalize_icon'></i>
					</div>
					<div className='gray_btn'>
						<i className='manage_icon'></i>
						<span>Manage Posts</span>
					</div>
				</div>
			</div>
			<div className={create_splitter}></div>
			<div className={`${create_post_body} ${grid_2}`}>
				<div className={`${view_type} active`}>
					<i className='list_icon filter_blue'></i>
					<span>List View</span>
				</div>
				<div className={view_type}>
					<i className='grid_icon'></i>
					<span>Grid View</span>
				</div>
			</div>
		</div>
	);
};

export default GridPosts;
