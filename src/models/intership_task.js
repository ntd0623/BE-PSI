'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Internship_Tasks extends Model {
    static associate(models) {
      // Định nghĩa quan hệ nếu cần
    }
  }
  Internship_Tasks.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT('long'),
      priorityID: DataTypes.STRING,
      deadline: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Internship_Tasks',
      freezeTableName: true,
      tableName: 'internship_tasks',
    }
  );
  return Internship_Tasks;
};
