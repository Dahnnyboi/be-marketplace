declare namespace Express {
  interface Request {
    // for passport.authenticate('local') middleware
    user: {
      userId: string;
      type: UserType;
    };

    // saving payload on user.id if authenticated
    payload: {
      userId: string;
      type: UserType;
    };
  }
}
