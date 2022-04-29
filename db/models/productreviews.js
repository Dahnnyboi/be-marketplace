'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductReviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductsReview.belongsTo(models.Products, {
        foreignKey: 'productId',
      });
      models.Products.hasMany(ProductsReview, {
        foreignKey: 'productId',
      });

      ProductsReview.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
      models.Users.hasOne(ProductsReview, { foreignKey: 'userId' });
    }
  }
  ProductReviews.init(
    {
      productReviewId: DataTypes.UUID,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      stars: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'ProductReviews',
      modelName: 'ProductReviews',
      timestamps: true,
    },
  );
  return ProductReviews;
};
