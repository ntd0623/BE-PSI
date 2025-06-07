'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Internship_Batches extends Model {
    static associate(models) {
      // Định nghĩa quan hệ nếu cần
    }
  }
  Internship_Batches.init(
    {
      userID: DataTypes.INTEGER,
      name: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Internship_Batches',
      freezeTableName: true,
      tableName: 'internship_batches',
    }
  );
  return Internship_Batches;
};
