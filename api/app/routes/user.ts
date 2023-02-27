import { Router } from 'express';
import {
	register,
	verifyAccount,
	login,
	resendVerificationCode,
	findUser,
	sendResetPasswordCode,
	validateResetCode,
	changePassword,
	getProfile,
	updateProfilePicture,
	updateCoverPhoto,
	updateProfileDetails,
	addFriend,
	cancelFriend,
	follow,
	unfollow,
	acceptFriend,
	unfriend,
	deleteRequest,
} from '../controllers/user';
import isAuth from '../middleware/isAuth';
import {
	validateChangePassword,
	validateLogin,
	validateRegister,
} from '../validators/user';

const router: Router = Router();

router.post('/user/register', validateRegister, register);
router.post('/user/login', validateLogin, login);
router.post('/user/verify', isAuth, verifyAccount);
router.post('/user/resend_verification_code', isAuth, resendVerificationCode);
router.post('/user/find_user', findUser);
router.post('/user/send_reset_password', sendResetPasswordCode);
router.post('/user/validate_reset_code', validateResetCode);
router.post('/user/change_password', validateChangePassword, changePassword);
router.get('/user/profile/:username', isAuth, getProfile);
router.put('/user/profile/update_pic', isAuth, updateProfilePicture);
router.put('/user/profile/update_cover', isAuth, updateCoverPhoto);
router.put('/user/profile/update_details', isAuth, updateProfileDetails);
router.put('/user/profile/add_friend/:userId', isAuth, addFriend);
router.put('/user/profile/cancel_friend/:userId', isAuth, cancelFriend);
router.put('/user/profile/follow/:userId', isAuth, follow);
router.put('/user/profile/unfollow/:userId', isAuth, unfollow);
router.put('/user/profile/accept_friend/:userId', isAuth, acceptFriend);
router.put('/user/profile/unfriend/:userId', isAuth, unfriend);
router.put('/user/profile/delete_request/:userId', isAuth, deleteRequest);

export default router;
