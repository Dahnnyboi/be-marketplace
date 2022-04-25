import { Service } from 'typedi';
import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelizeInstance from 'loaders/sequelize';
import { FEEDBACK } from 'constants/validations';
import UsersModel from 'models/users.model';

@Service()
class ProductsModel extends Model {
  name!: string;

  price!: number;

  description!: string;
}

ProductsModel.init(
  {
    productId: {
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: FEEDBACK.required('name'),
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: FEEDBACK.required('price'),
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: FEEDBACK.required('description'),
        },
      },
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'Products',
    modelName: 'Products',
    timestamps: true,
  },
);

ProductsModel.belongsTo(UsersModel, { foreignKey: 'userId' });
UsersModel.hasMany(ProductsModel, { foreignKey: 'userId' });

export default ProductsModel;
