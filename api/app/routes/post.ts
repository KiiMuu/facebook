import { Router } from 'express';
import { createPost } from '../controllers/post';
import isAuth from '../middleware/isAuth';

const router: Router = Router();

router.post('/post/create', isAuth, createPost);

export default router;
