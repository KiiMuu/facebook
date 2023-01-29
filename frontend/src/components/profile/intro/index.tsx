import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { FiEdit } from 'react-icons/fi';
import classes from './intro.module.scss';
import Bio from './Bio';
import { toast } from 'react-hot-toast';
import { updateUserInfos } from 'src/state/user/api';
import EditDetails from './EditDetails';

const ProfileIntro: React.FC<{ isVisitor: boolean }> = ({ isVisitor }) => {
	const [details, setDetails] = useState({
		bio: '',
		otherName: '',
		job: '',
		workPlace: '',
		highSchool: '',
		college: '',
		currentCity: '',
		homeTown: '',
		relationship: '',
		instagram: '',
	});
	const [showBio, setShowBio] = useState(false);
	const [showEditDetails, setShowEditDetails] = useState(false);
	const [maxChars, setMaxChars] = useState(
		details.bio ? 150 - details.bio.length : 150
	);

	const dispatch = useAppDispatch();
	const { profile, user } = useAppSelector(state => state.user);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;

		setDetails({
			...details,
			[name]: value,
		});
	};

	const handleUpdateDetails = useCallback(async () => {
		try {
			const res = await dispatch(
				updateUserInfos({ token: user?.token, details })
			);

			if (res.meta.requestStatus === 'fulfilled') {
				toast.success('Your details edited successfully.', {
					duration: 5000,
				});
				setShowBio(false);
				setShowEditDetails(false);
			}
		} catch (error) {
			toast.error(error.message);
		}
	}, [dispatch, details, user?.token]);

	useEffect(() => {
		if (details.bio) {
			setMaxChars(150 - details.bio.length);
		}
	}, [details.bio]);

	useEffect(() => {
		if (profile?.details) {
			if (Object.keys(profile!.details).length > 0)
				setDetails(profile!.details);
		}
	}, [profile]);

	const {
		profile_card,
		profile_card_header,
		info_col,
		info_profle,
		info_text,
		intro_actions,
	} = classes;

	return (
		<div className={profile_card}>
			<div className={profile_card_header}>Intro</div>
			{details.bio && !showBio && (
				<div className={info_col}>
					<span className={info_text}>{details.bio}</span>
					{!isVisitor && (
						<button
							title='Edit Bio'
							onClick={() => setShowBio(prev => !prev)}
						>
							<FiEdit />
						</button>
					)}
				</div>
			)}
			{showBio && (
				<Bio
					details={details}
					maxChars={maxChars}
					setShowBio={setShowBio}
					handleChange={handleChange}
					handleUpdateDetails={handleUpdateDetails}
				/>
			)}
			{details.job && details.workPlace ? (
				<div className={info_profle}>
					<img src='/icons/job.png' alt='job' />
					<span>
						Works as {details.job} at <b>{details.workPlace}</b>
					</span>
				</div>
			) : details.job && !details.workPlace ? (
				<div className={info_profle}>
					<img src='/icons/job.png' alt='job' />
					<span>Works as {details.job}</span>
				</div>
			) : (
				!details.job &&
				details.workPlace && (
					<div className={info_profle}>
						<img src='/icons/job.png' alt='job' />
						<span>
							Works at <b>{details.workPlace}</b>
						</span>
					</div>
				)
			)}
			{details.relationship && (
				<div className={info_profle}>
					<img src='/icons/relationship.png' alt='job' />
					<span>
						<b>{details.relationship}</b>
					</span>
				</div>
			)}
			{details.college && (
				<div className={info_profle}>
					<img src='/icons/studies.png' alt='job' />
					<span>
						Studies at <b>{details.college}</b>
					</span>
				</div>
			)}
			{details.highSchool && (
				<div className={info_profle}>
					<img src='/icons/studies.png' alt='job' />
					<span>
						Studies at <b>{details.highSchool}</b>
					</span>
				</div>
			)}
			{details.currentCity && (
				<div className={info_profle}>
					<img src='/icons/home.png' alt='job' />
					<span>
						Lives in <b>{details.currentCity}</b>
					</span>
				</div>
			)}
			{details.homeTown && (
				<div className={info_profle}>
					<img src='/icons/home.png' alt='job' />
					<span>
						From <b>{details.homeTown}</b>
					</span>
				</div>
			)}
			{details.instagram && (
				<div className={info_profle}>
					<img src='/icons/instagram.png' alt='job' />
					<a
						href={`https://www.instagram/${details.instagram}`}
						target='_blank'
						rel='noreferrer'
					>
						<b>{details.instagram}</b>
					</a>
				</div>
			)}
			<div className={intro_actions}>
				{!isVisitor && (
					<button
						className='gray_btn hover1'
						onClick={() => setShowEditDetails(prev => !prev)}
					>
						Edit Details
					</button>
				)}
				{showEditDetails && !isVisitor && (
					<EditDetails
						maxChars={maxChars}
						details={details}
						setShowEditDetails={setShowEditDetails}
						handleChange={handleChange}
						handleUpdateDetails={handleUpdateDetails}
					/>
				)}
				{!isVisitor && (
					<button className='gray_btn hover1'>Add Hobbies</button>
				)}
				{!isVisitor && (
					<button className='gray_btn hover1'>Add Fetaured</button>
				)}
			</div>
		</div>
	);
};

export default ProfileIntro;
