'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes_Results extends Model {
    static associate(models) {
      // Kết quả thuộc về 1 Quiz
      Quizzes_Results.belongsTo(models.Quizzes, {
        as: "quiz",
        foreignKey: "quiz_id",
      });

      // Một kết quả có nhiều selected answers
      Quizzes_Results.hasMany(models.Quizzes_Selected_Answers, {
        as: "selectedAnswers",
        foreignKey: "quiz_result_id",
        onDelete: "CASCADE",
        hooks: true,
      });

      // Kết quả thuộc về 1 User
      Quizzes_Results.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user',
      });

      Quizzes_Results.belongsTo(models.Quiz_Attempt, {
        as: "attempt",
        foreignKey: "attempt_id",
      });
    }
  }

  Quizzes_Results.init(
    {
      user_id: DataTypes.INTEGER,
      quiz_id: DataTypes.INTEGER,
      attempt_id: DataTypes.INTEGER,
      total_score: DataTypes.DECIMAL(5, 2),
      passed: DataTypes.BOOLEAN,
      submitted_at: DataTypes.DATE,
      total_correct: DataTypes.INTEGER,
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
