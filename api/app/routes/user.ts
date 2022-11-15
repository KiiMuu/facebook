import { Router } from 'express';
import { register, verifyAccount, login } from '../controllers/user';
import { validateLogin, validateRegister } from '../validators/user';

const router: Router = Router();

router.post('/user/register', validateRegister, register);
router.post('/user/verify', verifyAccount);
router.post('/user/login', validateLogin, login);

export default router;
