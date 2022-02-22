import { Router, Request, Response } from 'express';
import passport from 'passport';
import { body } from 'express-validator';
import { FEEDBACK } from 'constants/validations';
import { expressValidatorErrorHandler } from 'middlewares/errors/express-validator.middleware';
import authRequired from 'middlewares/auth/jwt.middleware';
import userService from 'services/user.service';
import authService from 'services/auth.service';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/login',
    body('email', FEEDBACK.required('email')).notEmpty(),
    body('password', FEEDBACK.required('password')).notEmpty(),
    expressValidatorErrorHandler,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    passport.authenticate('local'),
    async (req: Request, res: Response) => {
      if (!req.user)
        res
          .status(400)
          .json({ error: { message: 'Cannot find user' } })
          .end();

      const token = await authService.createToken(req?.user.userId);

      if (!token)
        res
          .status(500)
          .json({ error: { message: 'Failed to create token' } })
          .end();

      res.status(200).json({ data: { ...req.user, token } });
    },
  );

  route.get(
    '/refresh',
    authRequired,
    async (req: Request, res: Response) => {
      const { id } = req.payload;

      const user = await userService.findUserById(id);
      const token = await authService.createToken(id);

      if (!user && !token)
        res
          .status(500)
          .json({ error: { message: 'Failed to refresh token' } })
          .end();

      res.status(200).json({ data: { ...user, token } });
    },
  );
};
