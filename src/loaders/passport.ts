import passport from 'passport';
import userService from 'services/user.service';
import * as passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

export default () => {
  passport.serializeUser(
    (
      user: Express.User,
      done: (err: Error | null, userId?: Express.User) => void,
    ) => {
      done(null, user);
    },
  );

  passport.deserializeUser(
    (
      id: string,
      done: (err: Error | null, userId?: Express.User) => void,
    ) => {
      const handler = async () => {
        const result = await userService.findUserById(id);
        if (!result) return done(null, false);

        return done(null, result);
      };

      handler().catch((e: Error) => done(e, false));
    },
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
      },
      (email: string, password: string, done) => {
        const handler = async () => {
          const result = await userService.findUserByEmailAndPassword(
            email,
            password,
          );
          if (!result) return done(null, false);

          return done(null, result);
        };

        handler().catch((e: Error) => done(e, false));
      },
    ),
  );
};
