import { Service } from 'typedi';
import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelizeInstance from 'loaders/sequelize';
import { USER_TYPES } from 'constants/types';
import { FEEDBACK } from 'constants/validations';

@Service()
class UsersModel extends Model {
  firstName!: string;

  lastName!: string;

  email!: string;

  password!: string;

  type!: UserType;
}

UsersModel.init(
  {
    userId: {
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: FEEDBACK.required('first name'),
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: FEEDBACK.required('last name'),
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'email',
        msg: FEEDBACK.takenEmail,
      },
      validate: {
        notNull: {
          msg: FEEDBACK.required('email'),
        },
        isEmail: {
          msg: FEEDBACK.validEmail,
        },
      },
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: FEEDBACK.required('type'),
        },
        isIn: {
          msg: FEEDBACK.onlyValidType('type', USER_TYPES),
          args: [USER_TYPES],
        },
      },
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'Users',
    timestamps: true,
  },
);

export default UsersModel;
