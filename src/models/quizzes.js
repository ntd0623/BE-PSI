'use strict';
const { Model, DATE } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes extends Model {
    static associate(models) {
      // relationship
      Quizzes.hasMany(models.Quizzes_Questions, {
        as: "questions",
        foreignKey: "quizID",
        onDelete: "CASCADE",
        hooks: true,
      });

      Quizzes.hasMany(models.Quizzes_Results, {
        as: "results",
        foreignKey: "quiz_id",
        onDelete: "CASCADE",
        hooks: true,
      });

    }
  }
  Quizzes.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.BLOB('long'),
      description: DataTypes.TEXT('long'),
      duration_minutes: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Quizzes',
      freezeTableName: true,
      tableName: 'quizzes',
    }
  );
  return Quizzes;
};
