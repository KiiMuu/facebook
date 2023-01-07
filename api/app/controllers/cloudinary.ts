import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import { removeTmp } from '../utils/cloudinary';
import { SERVER_ERR } from '../constants';

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file: any, path: string) => {
	return new Promise((resolve, reject) => {
		cloudinary.v2.uploader.upload(
			file.tempFilePath,
			{ folder: path },
			(error: any, res: any) => {
				if (error) {
					removeTmp(file.tempFilePath);

					reject(error);
				}

				return resolve({
					url: res.secure_url,
				});
			}
		);
	});
};

const uploadImages = async (req: Request, res: Response) => {
	try {
		const { path } = req.body;

		let files = Object.values(req.files as object).flat();
		let images = [];

		for (const file of files) {
			const url = await uploadToCloudinary(file, path);

			images.push(url);

			removeTmp(file.tempFilePath);
		}

		return res.json(images);
	} catch (error: any) {
		return res.status(SERVER_ERR).json({
			message: error,
		});
	}
};

export { uploadImages };