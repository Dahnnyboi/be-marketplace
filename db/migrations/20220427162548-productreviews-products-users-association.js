'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addConstraint('ProductReviews', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'productreviews_product_association',
      references: {
        table: 'Products',
        field: 'productId',
      },
    });

    queryInterface.addConstraint('ProductReviews', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'productreviews_user_association',
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
      'ProductReviews',
      'productreviews_product_association',
      {
        fields: ['productId'],
        type: 'foreign key',
        references: {
          table: 'Products',
          field: 'productId',
        },
      },
    );

    queryInterface.removeConstraint(
      'ProductReviews',
      'productreviews_user_association',
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
