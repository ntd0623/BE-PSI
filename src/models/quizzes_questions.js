'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes_Questions extends Model {
    static associate(models) {
      // Định nghĩa quan hệ nếu cần
    }
  }

  Quizzes_Questions.init(
    {
      quizID: DataTypes.STRING,
      content: DataTypes.TEXT('long'),
      explanation: DataTypes.TEXT('long'),
    },
    {
      sequelize,
      modelName: 'Quizzes_Questions',
      freezeTableName: true,
      tableName: 'quizzes_questions',
    }
  );

  return Quizzes_Questions;
};
