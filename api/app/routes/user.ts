import { Router } from 'express';
import { register, verifyAccount } from '../controllers/user';
import { validateRegister } from '../validators/user';

const router: Router = Router();

router.post('/register', validateRegister, register);
router.post('/verify', verifyAccount);

export default router;
