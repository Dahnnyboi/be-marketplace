import { Service } from 'typedi';
import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelizeInstance from 'loaders/sequelize';
import { FEEDBACK } from 'constants/validations';
import ProductsModel from 'models/products.model';
import UsersModel from 'models/users.model';

@Service()
class ProductReviewsModel extends Model {
  title!: string;

  description!: string;

  stars!: number;
}

ProductReviewsModel.init(
  {
    productReviewId: {
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: FEEDBACK.required('title'),
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
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: FEEDBACK.required('stars'),
        },
        min: 0,
        max: 5,
      },
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'ProductReviews',
    modelName: 'ProductReviews',
    timestamps: true,
  },
);

// Products has many product reviews
ProductReviewsModel.belongsTo(ProductsModel, {
  foreignKey: 'productId',
});
ProductsModel.hasMany(ProductReviewsModel, {
  foreignKey: 'productId',
});

// User - buyer has one product review
ProductReviewsModel.belongsTo(UsersModel, { foreignKey: 'userId' });
UsersModel.hasOne(ProductReviewsModel, { foreignKey: 'userId' });

export default ProductReviewsModel;
