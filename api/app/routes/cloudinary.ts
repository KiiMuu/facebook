import { Router } from 'express';
import { uploadImages, getImages } from '../controllers/cloudinary';
import imageUpload from '../middleware/imageUpload';
import isAuth from '../middleware/isAuth';

const router: Router = Router();

router.post('/cloudinary/images', isAuth, imageUpload, uploadImages);
router.post('/cloudinary/images/list', isAuth, getImages);

export default router;
