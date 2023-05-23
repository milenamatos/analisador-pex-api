'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Crossing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Crossing.init({
    indicator_id: DataTypes.INTEGER,
    goal_id: DataTypes.INTEGER,
    relation: DataTypes.ENUM('X', 'I', 'O', 'IO')
  }, {
    sequelize,
    modelName: 'Crossing',
  });
  return Crossing;
};