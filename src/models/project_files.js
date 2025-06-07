'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project_Files extends Model {
    static associate(models) {
      // Định nghĩa quan hệ nếu cần
    }
  }
  Project_Files.init(
    {
      projectID: DataTypes.INTEGER,
      file_path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Project_Files',
      freezeTableName: true,
      tableName: 'project_files',
    }
  );
  return Project_Files;
};
