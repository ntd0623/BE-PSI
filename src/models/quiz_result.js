'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes_Results extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Quizzes_Results.init(
    {
      userID: DataTypes.INTEGER,
      quiz_id: DataTypes.INTEGER,
      total_score: DataTypes.DECIMAL(3, 2),
      passed: DataTypes.BOOLEAN,
      submitted_at: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Quizzes_Results',
      freezeTableName: true,
      tableName: 'quizzes_results',
    }
  );
  return Quizzes_Results;
};
