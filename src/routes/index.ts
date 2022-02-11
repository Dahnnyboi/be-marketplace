import { Router } from 'express';
import users from './apis/users.api';

export default (): Router => {
  const app = Router();
  users(app);

  return app;
};
