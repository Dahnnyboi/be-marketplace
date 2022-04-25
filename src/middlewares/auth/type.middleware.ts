import { Request, Response, NextFunction } from 'express';
import { USER_TYPES } from 'constants/types';

export const sellerCheckerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { type } = req.payload;

  if (type === USER_TYPES.seller) {
    next();
  } else {
    next({
      name: 'InvalidUserType',
      message: `User type must be "seller"`,
    });
  }
};

export const buyerCheckerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { type } = req.payload;

  if (type === USER_TYPES.buyer) {
    next();
  } else {
    next({
      name: 'InvalidUserType',
      message: `User type must be "buyer"`,
    });
  }
};
