import classes from './popup.module.scss';

const reacts = [
	{
		name: 'like',
		image: '../../reacts/like.gif',
	},
	{
		name: 'love',
		image: '../../reacts/love.gif',
	},
	{
		name: 'haha',
		image: '../../reacts/haha.gif',
	},
	{
		name: 'wow',
		image: '../../reacts/wow.gif',
	},
	{
		name: 'sad',
		image: '../../reacts/sad.gif',
	},
	{
		name: 'angry',
		image: '../../reacts/angry.gif',
	},
];

const PostReacts: React.FC<{
	areReactsVisible: boolean;
	setAreReactsVisible: (state: boolean) => void;
}> = ({ areReactsVisible, setAreReactsVisible }) => {
	const { reacts_popup, react } = classes;

	return (
		<>
			{areReactsVisible && (
				<div
					className={reacts_popup}
					onMouseOver={() =>
						setTimeout(() => setAreReactsVisible(true), 500)
					}
					onMouseLeave={() =>
						setTimeout(() => setAreReactsVisible(false), 500)
					}
				>
					{reacts.map((reactItem, i) => (
						<div key={i} className={react}>
							<img
								src={reactItem.image}
								alt={reactItem.name}
								loading='lazy'
							/>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default PostReacts;
