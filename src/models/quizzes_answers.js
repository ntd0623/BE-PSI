'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes_Answers extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  Quizzes_Answers.init(
    {
      questionID: DataTypes.INTEGER,
      content: DataTypes.TEXT('long'),
      isCorrect: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Quizzes_Answers',
      freezeTableName: true,
      tableName: 'quizzes_answers',
    }
  );
  return Quizzes_Answers;
};
