'use strict';

/** @type {import('sequelize-cli').Migration} */

const indicators = require('./assets/indicators.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Indicators', 
      indicators.map((indicator, index) => ({
        id: index+1,
        name: indicator[1],
        description: indicator[2],
        category_id: indicator[0],
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Indicators', null, {});
  }
};
