'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quizzes extends Model {
    static associate(models) {
      // Định nghĩa quan hệ nếu cần
    }
  }
  Quizzes.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT('long'),
      duration_minutes: DataTypes.INTEGER,
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
