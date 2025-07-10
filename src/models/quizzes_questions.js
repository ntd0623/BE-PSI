'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes_Questions extends Model {
    static associate(models) {
      // Relationship
      Quizzes_Questions.belongsTo(models.Quizzes, {
        as: "quiz",
        foreignKey: "quizID",
        onDelete: "CASCADE",
        hooks: true,
      });

      Quizzes_Questions.hasMany(models.Quizzes_Answers, {
        as: "answers",
        foreignKey: "questionID",
        onDelete: "CASCADE",
        hooks: true,
      });

    }
  }

  Quizzes_Questions.init(
    {
      quizID: DataTypes.INTEGER,
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
