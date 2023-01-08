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
	background,
	setBackground,
}) => {
	const [picker, setPicker] = useState(false);
	const [showBackgrounds, setShowBackgrounds] = useState(false);
	const [cursorPosition, setCursorPosition] = useState<number>();
	const textRef = useRef<any>(null);
	const bgRef = useRef<HTMLDivElement>(null);

	const handleEmoji = ({ emoji }: Emoji) => {
		const ref = textRef.current;

		const start = text.substring(0, ref?.selectionStart);
		const end = text.substring(ref?.selectionStart);
		const newText = start + emoji + end;

		setText(newText);
		setCursorPosition(start.length + emoji.length);

		ref?.focus();
	};

	const handleBackground = (i: number) => {
		bgRef.current!.style.backgroundImage = `url(${postBackgrounds[i]})`;

		setBackground!(postBackgrounds[i]);

		bgRef.current?.classList.add(bgHandler);
	};

	const removeBackground = () => {
		bgRef.current!.style.backgroundImage = '';

		setBackground!('');

		bgRef.current?.classList.remove(bgHandler);
	};

	useEffect(() => {
		textRef.current.selectionEnd = cursorPosition;
	}, [cursorPosition, textRef]);

	const postBackgrounds = [
		'/images/postBackgrounds/1.jpg',
		'/images/postBackgrounds/2.jpg',
		'/images/postBackgrounds/3.jpg',
		'/images/postBackgrounds/4.jpg',
		'/images/postBackgrounds/5.jpg',
		'/images/postBackgrounds/6.jpg',
		'/images/postBackgrounds/7.jpg',
		'/images/postBackgrounds/8.jpg',
		'/images/postBackgrounds/9.jpg',
		'/images/postBackgrounds/10.jpg',
	];

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
		post_backgrounds,
		no_back,
		bgHandler,
	} = classes;

	return (
		<div className={`${type2 ? image_input : ''}`}>
			<div className={`${!type2 ? flex_center : ''}`} ref={bgRef}>
				<textarea
					maxLength={250}
					value={text}
					className={`${post_input} ${type2 ? input2 : ''}`}
					placeholder={`What's on your mind? ${firstName}`}
					onChange={e => setText(e.target.value)}
					ref={textRef}
					style={{
						paddingTop: `${
							background
								? Math.abs(
										textRef?.current?.value?.length * 0.1 -
											35
								  )
								: '0'
						}%`,
					}}
				></textarea>
			</div>
			<div className={`${!type2 ? post_emojis_wrap : ''}`}>
				{picker && (
					<div
						className={`${comment_emoji_picker} ${
							type2 || showBackgrounds ? movepicker2 : rlmove
						}`}
					>
						<EmojiPicker onEmojiClick={handleEmoji} />
					</div>
				)}
				{!type2 && (
					<img
						src='/icons/colorful.png'
						alt='post theme'
						onClick={() => setShowBackgrounds(prev => !prev)}
					/>
				)}
				{!type2 && showBackgrounds && (
					<div className={post_backgrounds}>
						<div
							className={no_back}
							onClick={() => removeBackground()}
						></div>
						{postBackgrounds.map((bg, i) => (
							<img
								src={bg}
								key={i}
								alt='background-color'
								onClick={() => handleBackground(i)}
							/>
						))}
					</div>
				)}
				<i
					className={`emoji_icon_large ${type2 ? moveleft : ''}`}
					onClick={() => setPicker(prev => !prev)}
				></i>
			</div>
		</div>
	);
};

export default EmojiPickerBackground;
