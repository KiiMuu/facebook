import { Router } from 'express';
import { register } from '../controllers/user';
import { validateRegister } from '../validators/user';

const router: Router = Router();

router.post('/register', validateRegister, register);

export default router;
