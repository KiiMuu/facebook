import { Router } from 'express';
import { createPost, getAllPosts, createComment } from '../controllers/post';
import isAuth from '../middleware/isAuth';

const router: Router = Router();

router.post('/post/create', isAuth, createPost);
router.get('/post/getAllPosts', isAuth, getAllPosts);
router.put('/post/comment/create', isAuth, createComment);

export default router;
