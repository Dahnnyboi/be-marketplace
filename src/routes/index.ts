import { Router } from 'express';
import users from './apis/users.api';
import auth from './apis/auth.api';
import upload from './apis/upload.api';
import products from './apis/products.api';

export default (): Router => {
  const app = Router();
  users(app);
  auth(app);
  upload(app);
  products(app);

  return app;
};
