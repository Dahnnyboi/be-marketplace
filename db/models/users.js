'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      userId: DataTypes.UUID,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      salt: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps,
      modelName: 'Users',
    },
  );
  return Users;
};
