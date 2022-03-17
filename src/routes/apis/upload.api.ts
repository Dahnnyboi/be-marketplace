import { Router, Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import authRequired from 'middlewares/auth/jwt.middleware';
import uploadService from 'services/upload.service';
import 'constants/cloudinary';

const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;

const route = Router();

export default (app: Router) => {
  app.use('/upload', route);

  route.get('/image', authRequired, (req: Request, res: Response) => {
    const { timestamp, signature } = uploadService.signUploadForm();

    res.status(200).json({
      data: {
        signature,
        timestamp,
        cloudname: cloudName,
        apikey: apiKey,
      },
    });
  });
};
