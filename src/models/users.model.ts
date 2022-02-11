import { Service } from 'typedi';
import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelizeInstance from 'loaders/sequelize';
import { USER_TYPES } from 'constants/types';

@Service()
class UsersModel extends Model {
  firstName!: string;

  lastName!: string;

  email!: string;

  password!: string;

  type!: userType;
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
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
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
        isIn: [USER_TYPES],
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
