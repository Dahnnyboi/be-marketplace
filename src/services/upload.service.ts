import { Service, Container } from 'typedi';
import { v2 as cloudinary } from 'cloudinary';
import 'constants/cloudinary';

const apiSecret: string = cloudinary.config().api_secret as string;

@Service()
class UploadService {
  // eslint-disable-next-line class-methods-use-this
  signUploadForm(): Record<string, number | string> {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
        folder: 'signed_upload_demo_form',
      },
      apiSecret,
    );

    return { timestamp, signature };
  }
}

export default Container.get(UploadService);
