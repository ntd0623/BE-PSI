'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    static associate(models) {
      // Định nghĩa quan hệ nếu có
      Projects.belongsTo(models.Cvs, { foreignKey: 'cv_id' });
    }
  }
  Projects.init(
    {
      cv_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT('long'),
      role: DataTypes.STRING,
      technologies: DataTypes.STRING,
      github_url: DataTypes.STRING,
      demo_url: DataTypes.STRING,
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
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
