import { Router } from 'express';
import { createPost, getAllPosts } from '../controllers/post';
import isAuth from '../middleware/isAuth';

const router: Router = Router();

router.post('/post/create', isAuth, createPost);
router.get('/post/getAllPosts', isAuth, getAllPosts);

export default router;
