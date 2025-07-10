'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes_Results extends Model {
    static associate(models) {
      // Define associations here if needed
      Quizzes_Results.belongsTo(models.Quizzes, {
        as: "quizzes",
        foreignKey: "quiz_id",
      });
      Quizzes_Results.hasMany(models.Quizzes_Selected_Answers, {
        as: "selectedAnswers",
        foreignKey: "quiz_result_id",
        onDelete: "CASCADE",
        hooks: true,
      });
      Quizzes_Results.belongsTo(models.Users, {
        foreignKey: 'userID',
        as: 'userData',
      });

    }
  }
  Quizzes_Results.init(
    {
      userID: DataTypes.INTEGER,
      quiz_id: DataTypes.INTEGER,
      total_score: DataTypes.DECIMAL(4, 2),
      passed: DataTypes.BOOLEAN,
      submitted_at: DataTypes.DATE,
      total_correct: {
        type: DataTypes.INTEGER,
        field: "total_correct",
      },
      total_question: DataTypes.INTEGER,
      duration_used: DataTypes.INTEGER,
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
