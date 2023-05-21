'use strict';

/** @type {import('sequelize-cli').Migration} */

const goals = require('./assets/goals.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('goals', 
      goals.map((goal) => ({
        id: goal[0],
        name: goal[1],
        category_id: goal[2],
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('goals', null, {});
  }
};
