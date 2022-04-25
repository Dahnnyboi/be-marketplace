import { Service, Container } from 'typedi';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'constants/environments';
import { JWT_ALGORITHM } from 'constants/common';

@Service()
class AuthService {
  // eslint-disable-next-line class-methods-use-this
  async createToken(
    userId: string,
    type: UserType,
  ): Promise<string | false> {
    const token: string = await new Promise((resolve, reject) => {
      sign(
        { userId, type },
        JWT_SECRET,
        {
          algorithm: JWT_ALGORITHM,
          expiresIn: '1h',
        },
        (err, value) => {
          if (!value || err) reject(err);

          if (value !== undefined) resolve(value);
        },
      );
    });

    return token || false;
  }
}

export default Container.get(AuthService);
