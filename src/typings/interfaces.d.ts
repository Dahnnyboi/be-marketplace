declare namespace Express {
  interface Request {
    // for passport.authenticate('local') middleware
    user: {
      userId: string;
    };

    // saving payload on user.id if authenticated
    payload: {
      id: string;
    };
  }
}
