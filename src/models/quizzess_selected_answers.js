'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes_Selected_Answers extends Model {
    static associate(models) {
      // Define associations here nếu có
      Quizzes_Selected_Answers.belongsTo(models.Quizzes_Results, {
        as: "result",
        foreignKey: "quiz_result_id",
      });
      Quizzes_Selected_Answers.belongsTo(models.Quizzes_Answers, {
        as: "answer",
        foreignKey: "answer_id",
      });
      Quizzes_Selected_Answers.belongsTo(models.Quizzes_Questions, {
        as: "question",
        foreignKey: "question_id",
      });

    }
  }
  Quizzes_Selected_Answers.init(
    {
      quiz_result_id: DataTypes.INTEGER,
      answer_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
      isCorrect: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Quizzes_Selected_Answers',
      freezeTableName: true,
      tableName: 'quizzes_selected_answers',
    }
  );
  return Quizzes_Selected_Answers;
};
