import { Request } from 'express';
import expressJwt from 'express-jwt';
import { JWT_SECRET } from 'constants/environments';
import { JWT_ALGORITHM } from 'constants/common';

function getTokenFromHeader(req: Request): string | undefined {
  if (req.headers.authorization) {
    // bearer tokenName
    return req.headers.authorization.split(' ')[1];
  }

  return undefined;
}

export default expressJwt({
  algorithms: [JWT_ALGORITHM],
  secret: JWT_SECRET,
  getToken: getTokenFromHeader,
  userProperty: 'payload',
});
