'use strict';

/** @type {import('sequelize-cli').Migration} */

/*
reference for Goal_id columns:
1	2	3	4	10 11	16 17	5	6	7	12 13	14 15	8	9
*/

const crossings = require('./assets/crossings.json')
const goals = [1, 2, 3, 4, 10, 11, 16, 17, 5, 6, 7, 12, 13, 14, 15, 8, 9]

const itemsToInsert = crossings.reduce(
  (accumulator, current, listIndex) =>
    accumulator.concat(
      current.map((value, index) => ({
        indicator_id: listIndex + 1,
        goal_id: goals[index],
        relation: value,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    ),
  [])

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('crossing_matrix',
      itemsToInsert.filter((item) => item.relation !== '')
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('crossing_matrix', null, {});
  }
};
