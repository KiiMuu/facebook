import { Dispatch } from 'react';
import classes from './popup.module.scss';

const PostError: React.FC<{
	localError: string;
	setLocalError: Dispatch<React.SetStateAction<string>>;
}> = ({ localError, setLocalError }) => {
	const { post_error } = classes;

	return (
		<div className={post_error}>
			<span>{localError}</span>
			<button className='blue_btn' onClick={() => setLocalError('')}>
				Try Again
			</button>
		</div>
	);
};

export default PostError;
