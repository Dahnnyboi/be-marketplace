'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Users, { foreignKey: 'userId' });
      models.Users.hasMany(Products, { foreignKey: 'userId' });
    }
  }
  Products.init(
    {
      productId: DataTypes.UUID,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps,
      modelName: 'Products',
    },
  );
  return Products;
};
