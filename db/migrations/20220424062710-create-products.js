'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      productId: {
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'name is required', // under constants/validations.ts
          },
        },
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'price is required', // under constants/validations.ts
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'description is required', // under constants/validations.ts
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.UUID,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  },
};
