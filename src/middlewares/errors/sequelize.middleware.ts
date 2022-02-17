import { Request, Response, NextFunction } from 'express';
import { BaseError, ValidationError } from 'sequelize';

export const SequelizeErrorMiddleware = (
  err: Error | BaseError | ValidationError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ValidationError) {
    const { errors } = err;
    res.status(400).json({
      error: {
        name: err.name,
        message: 'Validation Error',
        errors: errors.map((error) => {
          const { message } = error;

          return message;
        }),
      },
    });
  } else {
    next(err);
  }
};
