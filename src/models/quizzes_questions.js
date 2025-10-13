'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes_Questions extends Model {
    static associate(models) {
      // Relationship
      Quizzes_Questions.belongsTo(models.Quizzes, {
        as: "quiz",
        foreignKey: "quiz_id",
        onDelete: "CASCADE",
        hooks: true,
      });

      Quizzes_Questions.hasMany(models.Quizzes_Answers, {
        as: "answers",
        foreignKey: "question_id",
        onDelete: "CASCADE",
        hooks: true,
      });
      Quizzes_Questions.hasMany(models.Quizzes_Question_Images, {
        foreignKey: 'question_id',
        as: 'images_question',
        onDelete: 'CASCADE',
      });

      Quizzes_Questions.belongsTo(models.Allcodes,
        {
          foreignKey: 'type',
          targetKey: "key",
          as: "type_question",
          onDelete: 'CASCADE',
        }

      )
      Quizzes_Questions.hasMany(models.Quiz_Question_Attempt, {
        as: "questionAttempts",
        foreignKey: "question_id",
      });

    }
  }

  Quizzes_Questions.init(
    {
      quiz_id: DataTypes.INTEGER,
      content: DataTypes.TEXT('long'),
      explanation: DataTypes.TEXT('long'),
      type: DataTypes.STRING,
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
