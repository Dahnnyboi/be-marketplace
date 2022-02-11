import { Router, Request, Response, NextFunction } from 'express';
import UserModel from 'models/users.model';
import UserService from 'services/user.service';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.post(
    '/signup',
    (req: Request, res: Response, next: NextFunction) => {
      const { firstName, lastName, email, password, type } =
        req.body as UserModel;

      const handler = async () => {
        await UserService.createUser(
          firstName,
          lastName,
          email,
          password,
          type,
        );
      };

      handler()
        .then(() => {
          res
            .status(200)
            .json({ message: 'Successfully created a user!' });
        })
        .catch((err: Error) => {
          next(err);
        });
    },
  );
};
