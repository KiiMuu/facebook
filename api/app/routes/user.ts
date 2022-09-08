import { Router } from 'express';
import { getUser } from '../controllers/user';

const router: Router = Router();

router.get('/user', getUser);

export default router;
