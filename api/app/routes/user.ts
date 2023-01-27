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

export default router;
