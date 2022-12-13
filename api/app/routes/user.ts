import { Router } from 'express';
import {
	register,
	verifyAccount,
	login,
	resendVerificationCode,
} from '../controllers/user';
import isAuth from '../middleware/isAuth';
import { validateLogin, validateRegister } from '../validators/user';

const router: Router = Router();

router.post('/user/register', validateRegister, register);
router.post('/user/login', validateLogin, login);
router.post('/user/verify', isAuth, verifyAccount);
router.post('/user/resend_verification_code', isAuth, resendVerificationCode);

export default router;
