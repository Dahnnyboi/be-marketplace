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
    type: UserType,
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

  async updateUserDetails(
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    image?: string,
  ): Promise<void> {
    await this.UserModelService.update(
      {
        firstName,
        lastName,
        email,
        image,
      },
      { where: { userId: id } },
    );
  }

  async checkUserPassword(
    id: string,
    password: string,
  ): Promise<boolean> {
    const user = await this.UserModelService.findOne({
      where: { userId: id },
    });

    if (!user) return false;

    const { password: userPassword } = user;
    const match = await bcrypt.compare(password, userPassword);

    return match;
  }

  async updateUserPassword(id: string, password: string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashPassword = await bcrypt.hash(password, salt);

    await this.UserModelService.update(
      {
        salt,
        password: hashPassword,
      },
      { where: { userId: id } },
    );
  }

  async findUserById(id: string): Promise<false | UserModel> {
    const user = await this.UserModelService.findOne({
      where: { userId: id },
    });

    if (!user) return false;

    return user;
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<false | UserModel> {
    const user = await this.UserModelService.findOne({
      where: { email },
    });

    if (!user) return false;

    const { password: userPassword } = user;
    const match = await bcrypt.compare(password, userPassword);

    if (!match) return false;

    return user;
  }
}

export default Container.get(UsersService);
