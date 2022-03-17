import { Router, Request, Response, NextFunction } from 'express';
import { body, check } from 'express-validator';
import UserModel from 'models/users.model';
import userService from 'services/user.service';
import { REGEX, FEEDBACK } from 'constants/validations';
import { expressValidatorErrorHandler } from 'middlewares/errors/express-validator.middleware';
import authRequired from 'middlewares/auth/jwt.middleware';

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

  route.put(
    '/details',
    authRequired,

    body('email')
      .isEmail()
      .withMessage(FEEDBACK.validEmail)
      .optional({ checkFalsy: true }),
    expressValidatorErrorHandler,
    (req: Request, res: Response, next: NextFunction) => {
      const { firstName, lastName, email, image } =
        req.body as UserModel;
      const { id } = req.payload;

      const handler = async () => {
        await userService.updateUserDetails(
          id,
          firstName,
          lastName,
          email,
          image,
        );
      };

      handler()
        .then(() => {
          res
            .status(200)
            .json({ message: 'Successfully updated your user!' });
        })
        .catch((err) => {
          next(err);
        });
    },
  );

  route.put(
    '/password',
    authRequired,
    body(
      'currentPassword',
      FEEDBACK.required('current password'),
    ).notEmpty(),
    body('newPassword', FEEDBACK.required('new password'))
      .notEmpty()
      .matches(REGEX.password)
      .withMessage(FEEDBACK.password),
    body(
      'confirmPassword',
      FEEDBACK.required('confirm password'),
    ).notEmpty(),
    check('newPassword').custom((value, { req }): string => {
      const { confirmPassword } = req.body as PasswordBody;

      if (value !== confirmPassword) {
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),
    expressValidatorErrorHandler,
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.payload;
      const { currentPassword, newPassword } =
        req.body as PasswordBody;

      const isCurrPasswordMatch = await userService.checkUserPassword(
        id,
        currentPassword,
      );

      const isNewPasswordMatch = await userService.checkUserPassword(
        id,
        newPassword,
      );

      if (!isCurrPasswordMatch) {
        res.status(400).json({
          error: {
            message:
              'Old Password does not match on your current password',
          },
        });
        return;
      }

      if (isNewPasswordMatch) {
        res.status(400).json({
          error: {
            message:
              'New Password should not match on your current password',
          },
        });
        return;
      }

      try {
        await userService.updateUserPassword(id, newPassword);

        res
          .status(200)
          .json({ message: 'Successfully updated your password!' });
      } catch (e) {
        next(e);
      }
    },
  );
};
