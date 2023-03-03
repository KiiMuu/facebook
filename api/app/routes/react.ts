import { Router } from 'express';
import { reactOnPost, getPostReacts } from '../controllers/react';
import isAuth from '../middleware/isAuth';

const router: Router = Router();

router.put('/react', isAuth, reactOnPost);
router.get('/reacts/:postId', isAuth, getPostReacts);

export default router;
