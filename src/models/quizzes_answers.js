'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes_Answers extends Model {
    static associate(models) {
      // define association here if needed
      Quizzes_Answers.belongsTo(models.Quizzes_Questions, {
        as: "question",
        foreignKey: "question_id",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Quizzes_Answers.init(
    {
      question_id: DataTypes.INTEGER,
      content: DataTypes.TEXT('long'),
      is_correct: DataTypes.BOOLEAN,
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
