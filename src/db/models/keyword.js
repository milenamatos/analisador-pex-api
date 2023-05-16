'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Keyword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Keyword.init({
    name: DataTypes.STRING,
    goal_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Keyword',
  });
  return Keyword;
};