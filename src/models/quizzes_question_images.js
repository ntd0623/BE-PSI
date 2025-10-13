'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes_Question_Images extends Model {
    static associate(models) {
      // define association here if needed
      Quizzes_Question_Images.belongsTo(models.Quizzes_Questions, {
        foreignKey: 'question_id',
        as: 'question',
        onDelete: 'CASCADE',
      });
    }
  }
  Quizzes_Question_Images.init(
    {
      question_id: DataTypes.INTEGER,
      image: DataTypes.BLOB("long"),
      caption: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Quizzes_Question_Images',
      freezeTableName: true,
      tableName: 'quizzes_question_images',
    }
  );
  return Quizzes_Question_Images;
};
