import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import UserModel from 'models/users.model';
import userService from 'services/user.service';
import { REGEX, FEEDBACK } from 'constants/validations';
import { expressValidatorErrorHandler } from 'middlewares/errors/express-validator.middleware';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.post(
    '/signup',
    body('firstName', FEEDBACK.required('first name')).notEmpty(),
    body('lastName', FEEDBACK.required('last name')).notEmpty(),
    body('email', FEEDBACK.required('email'))
      .notEmpty()
      .isEmail()
      .withMessage(FEEDBACK.validEmail),
    body('password', FEEDBACK.required('password'))
      .notEmpty()
      .matches(REGEX.password)
      .withMessage(FEEDBACK.password),
    expressValidatorErrorHandler,
    (req: Request, res: Response, next: NextFunction) => {
      const { firstName, lastName, email, password, type } =
        req.body as UserModel;

      const handler = async () => {
        await userService.createUser(
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
        .catch((err) => {
          next(err);
        });
    },
  );
};
