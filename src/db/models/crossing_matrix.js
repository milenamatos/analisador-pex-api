'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CrossingMatrix extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CrossingMatrix.init({
    indicator_id: DataTypes.INTEGER,
    goal_id: DataTypes.INTEGER,
    relation: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'CrossingMatrix',
  });
  return CrossingMatrix;
};