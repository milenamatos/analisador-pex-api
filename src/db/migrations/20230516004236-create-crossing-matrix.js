'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('crossing_matrix', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      indicator_id: {
        type: Sequelize.INTEGER,
        references: { model: 'indicators', key: 'id' }
      },
      goal_id: {
        type: Sequelize.INTEGER,
        references: { model: 'goals', key: 'id' }
      },
      relation: {
        allowNull: false,
        type: Sequelize.ENUM('X', 'I', 'O', 'IO')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('crossing_matrix');
  }
};