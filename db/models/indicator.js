'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Indicator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models['Category'], {
        foreignKey: 'category_id'
      })
    }
  }
  Indicator.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    objective: DataTypes.STRING,
    formula: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Indicator',
  });
  return Indicator;
};