import { Router } from 'express';
import users from './apis/users.api';
import auth from './apis/auth.api';

export default (): Router => {
  const app = Router();
  users(app);
  auth(app);

  return app;
};
