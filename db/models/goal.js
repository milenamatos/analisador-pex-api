'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models['Keyword'], {
        foreignKey: 'goal_id'
      })

      this.belongsTo(models['Category'], {
        foreignKey: 'category_id'
      })

      this.hasMany(models['Crossings'], {
        foreignKey: 'goal_id'
      })
    }
  }
  Goal.init({
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Goal',
  });
  return Goal;
};