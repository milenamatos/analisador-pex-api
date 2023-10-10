'use strict';

/** @type {import('sequelize-cli').Migration} */

const categories = require('./assets/categories.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', 
      categories.map((category) => ({
        id: category[0],
        title: category[1],
        type: category[2],
        label: category[3],
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
