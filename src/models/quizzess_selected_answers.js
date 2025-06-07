'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes_Selected_Answers extends Model {
    static associate(models) {
      // Define associations here nếu có
    }
  }
  Quizzes_Selected_Answers.init(
    {
      quiz_result_id: DataTypes.INTEGER,
      answer_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
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
