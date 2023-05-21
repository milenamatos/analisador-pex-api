'use strict';

/** @type {import('sequelize-cli').Migration} */

const keywords = require('./assets/keywords.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('keywords', 
    keywords.map((keyword) => ({
        name: keyword[1],
        goal_id: keyword[0],
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('keywords', null, {});
  }
};
