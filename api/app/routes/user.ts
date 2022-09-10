import { Router } from 'express';
import { register, verifyAccount, login } from '../controllers/user';
import { validateLogin, validateRegister } from '../validators/user';

const router: Router = Router();

router.post('/register', validateRegister, register);
router.post('/verify', verifyAccount);
router.post('/login', validateLogin, login);

export default router;
