import { Router } from 'express';
import {
	createPost,
	getAllPosts,
	createComment,
	savePost,
	getSavedPosts,
	deletePost,
} from '../controllers/post';
import isAuth from '../middleware/isAuth';

const router: Router = Router();

router.post('/post/create', isAuth, createPost);
router.get('/post/getAllPosts', isAuth, getAllPosts);
router.put('/post/comment/create', isAuth, createComment);
router.put('/post/save/:postId', isAuth, savePost);
router.get('/post/saved', isAuth, getSavedPosts);
router.delete('/post/delete/:postId', isAuth, deletePost);

export default router;
