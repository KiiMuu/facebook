import { useState, useRef } from 'react';
import useDetectOutsideClicks from 'src/hooks/useDetectOutsideClicks';
import classes from './profile.module.scss';

const Cover: React.FC<{ cover?: string; username?: string }> = ({
	cover,
	username,
}) => {
	const [showCoverMenu, setShowCoverMenu] = useState(false);
	const menuRef = useRef(null);

	useDetectOutsideClicks(menuRef, () => setShowCoverMenu(false));

	const {
		profile_cover,
		update_cover_wrapper,
		open_cover_update,
		open_cover_menu,
		open_cover_menu_item,
	} = classes;

	return (
		<div className={profile_cover}>
			{/* {cover && <img src={cover} alt={username} className={cover} />} */}
			<div className={update_cover_wrapper}>
				<div
					className={open_cover_update}
					onClick={() => setShowCoverMenu(prev => !prev)}
				>
					<i className='camera_filled_icon'></i>
					<span>Add Cover Photo</span>
				</div>
				{showCoverMenu && (
					<div className={open_cover_menu} ref={menuRef}>
						<div className={`${open_cover_menu_item} hover1`}>
							<i className='photo_icon'></i>
							<span>Select Photo</span>
						</div>
						<div className={`${open_cover_menu_item} hover1`}>
							<i className='upload_icon'></i>
							<span>Upload Photo</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cover;
