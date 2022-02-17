/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { BaseError } from 'sequelize';

export const customErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res
    .status(500)
    .json({ error: { name: err.name, message: 'Server Error' } });
};

export const unauthorizedErrorHandler = (
  err: Error | BaseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({ error: { name: err.name, message: 'Unauthorized' } });
  } else {
    next(err);
  }
};

export const cannotFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({
    error: {
      name: 'NotFound',
      message: `API Route doesn't exists`,
    },
  });
};
