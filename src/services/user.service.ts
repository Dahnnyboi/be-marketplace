import { Service, Inject, Container } from 'typedi';
import bcrypt from 'bcrypt';
import UserModel from 'models/users.model';
import { SALT_ROUNDS } from 'constants/common';

Container.set('userModel', UserModel);

@Service()
class UsersService {
  constructor(
    @Inject('userModel') private UserModelService: typeof UserModel,
  ) {}

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    type: userType,
  ): Promise<void> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashPassword = await bcrypt.hash(password, salt);

    await this.UserModelService.create({
      firstName,
      lastName,
      email,
      salt,
      type,
      password: hashPassword,
    });
  }
}

export default Container.get(UsersService);
