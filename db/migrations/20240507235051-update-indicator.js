'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'Indicators',
          'objective',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Indicators',
          'formula',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Indicators', 'objective', { transaction: t }),
        queryInterface.removeColumn('Indicators', 'formula', { transaction: t }),
      ]);
    });
  }
};
