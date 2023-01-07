import { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import classes from '../post/popup/popup.module.scss';

interface Emoji {
	emoji: string;
}

const EmojiPickerBackground: React.FC<IEmojiComponent> = ({
	firstName,
	text,
	setText,
	type2,
}) => {
	const [picker, setPicker] = useState(false);
	const [cursorPosition, setCursorPosition] = useState<number>();
	const textRef = useRef<any>(null);

	const handleEmoji = ({ emoji }: Emoji) => {
		const ref = textRef.current;

		const start = text.substring(0, ref?.selectionStart);
		const end = text.substring(ref?.selectionStart);
		const newText = start + emoji + end;

		setText(newText);
		setCursorPosition(start.length + emoji.length);

		ref?.focus();
	};

	useEffect(() => {
		textRef.current.selectionEnd = cursorPosition;
	}, [cursorPosition, textRef]);

	const {
		post_emojis_wrap,
		comment_emoji_picker,
		rlmove,
		flex_center,
		post_input,
		movepicker2,
		moveleft,
		input2,
		image_input,
	} = classes;

	return (
		<div className={`${type2 ? image_input : ''}`}>
			<div className={`${!type2 ? flex_center : ''}`}>
				<textarea
					maxLength={100}
					value={text}
					className={`${post_input} ${type2 ? input2 : ''}`}
					placeholder={`What's on your mind? ${firstName}`}
					onChange={e => setText(e.target.value)}
					ref={textRef}
				></textarea>
			</div>
			<div className={`${!type2 ? post_emojis_wrap : ''}`}>
				{picker && (
					<div
						className={`${comment_emoji_picker} ${
							type2 ? movepicker2 : rlmove
						}`}
					>
						<EmojiPicker onEmojiClick={handleEmoji} />
					</div>
				)}
				{!type2 && <img src='/icons/colorful.png' alt='post theme' />}
				<i
					className={`emoji_icon_large ${type2 ? moveleft : ''}`}
					onClick={() => setPicker(prev => !prev)}
				></i>
			</div>
		</div>
	);
};

export default EmojiPickerBackground;
