'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addConstraint('Products', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'products_users_association',
      references: {
        table: 'Users',
        field: 'userId',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeConstraint(
      'Products',
      'products_users_association',
      {
        fields: ['userId'],
        type: 'foreign key',
        references: {
          table: 'Users',
          field: 'userId',
        },
      },
    );
  },
};
