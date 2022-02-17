import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';

export const expressValidatorErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const resultErrors: string[] = [];
    const errorsArray: ValidationError[] = errors.array();
    errorsArray.forEach((error: ValidationError) => {
      resultErrors.push(String(error.msg));
    });

    res.status(400).json({
      error: {
        name: 'ExpressValidationError',
        message: 'Validation Error',
        errors: resultErrors,
      },
    });
  } else {
    next();
  }
};
