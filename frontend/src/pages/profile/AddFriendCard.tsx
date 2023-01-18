import classes from './profile.module.scss';

const AddFriendCard: React.FC<{ person: IPersonCard }> = ({ person }) => {
	const { add_friend_card, add_friend_img, add_friend_infos, name } = classes;

	return (
		<div className={add_friend_card}>
			<div className={add_friend_img}>
				<img src={person.profile_picture} alt={person.profile_name} />
				<div className={add_friend_infos}>
					<div className={name}>
						{person.profile_name.length > 11
							? `${person.profile_name.substring(0, 11)}...`
							: person.profile_name}
					</div>
					<div className='light_blue_btn'>
						<img
							src='/icons/addFriend.png'
							alt='Add Friend'
							className='filter_blue'
						/>
						<span>Add Friend</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddFriendCard;
