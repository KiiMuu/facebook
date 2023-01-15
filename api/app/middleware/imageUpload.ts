import { NextFunction, Request, Response } from 'express';
import { removeTmp } from '../utils/cloudinary';
import { BAD_REQ, SERVER_ERR } from '../constants';

const imageUpload = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.files || !Object.values(req.files as object).flat().length) {
			return res
				.status(BAD_REQ)
				.json({ message: 'No files were uploaded.' });
		}

		let files = Object.values(req.files as object).flat();

		files.forEach(file => {
			if (!file.mimetype.includes('image')) {
				removeTmp(file.tempFilePath);

				return res.status(BAD_REQ).json({
					message: 'Unsupported format. Images formats only.',
				});
			}

			// By default size is determined in bytes format
			// Converting it into MBs format
			// if size is larger than 3MB
			if (file.size > 1024 * 1024 * 3) {
				return res.status(BAD_REQ).json({
					message:
						'File size is too large. Maximum file size is 3MB.',
				});
			}

			next();
		});
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error.message,
		});
	}
};

export default imageUpload;
