'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'first name is required', // under constants/validations.ts
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'last name is required', // under constants/validations.ts
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          name: 'email',
          msg: 'Email is already taken', // under constants/validations.ts
        },
        validate: {
          notNull: {
            msg: 'email is required', // under constants/validations.ts
          },
          isEmail: {
            msg: 'Provide a valid email', // under constants/validations.ts
          },
        },
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'type is required', // under constants/validations.ts
          },
          isIn: {
            msg: 'type should be only be buyer and seller',
            args: ['buyer', 'seller'],
          },
        },
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
