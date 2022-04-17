'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('Users', {
      userId: {
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'first name is required', // under constants/validations.ts
          },
        },
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'last name is required', // under constants/validations.ts
          },
        },
      },
      email: {
        type: Sequelize.DataTypes.STRING,
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
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
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
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Users');
  },
};
