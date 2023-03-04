import { LegacyRef } from 'react';
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
	handleReactOnPost: (reactName: string) => Promise<void>;
	reactedByMeType: string;
	setReactedByMeType: (state: string) => void;
	reactActionRef: LegacyRef<HTMLDivElement> | undefined;
}> = ({ areReactsVisible, handleReactOnPost, reactActionRef }) => {
	const { reacts_popup, react } = classes;

	return (
		<>
			{areReactsVisible && (
				<div ref={reactActionRef} className={reacts_popup}>
					{reacts.map((reactItem, i) => (
						<div
							key={i}
							className={react}
							onClick={() => handleReactOnPost(reactItem.name)}
						>
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
