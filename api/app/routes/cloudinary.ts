import { Router } from 'express';
import { uploadImages } from '../controllers/cloudinary';
import imageUpload from '../middleware/imageUpload';
import isAuth from '../middleware/isAuth';

const router: Router = Router();

router.post('/cloudinary/images', isAuth, imageUpload, uploadImages);

export default router;
