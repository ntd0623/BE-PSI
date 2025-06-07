'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    static associate(models) {
      // Định nghĩa quan hệ nếu có
    }
  }
  Projects.init(
    {
      userID: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT('long'),
      statusProject: DataTypes.STRING,
      progress_percent: DataTypes.INTEGER,
      submisstion_date: DataTypes.DATE,
      score: DataTypes.DECIMAL(3, 2),
    },
    {
      sequelize,
      modelName: 'Projects',
      freezeTableName: true,
      tableName: 'projects',
    }
  );
  return Projects;
};
