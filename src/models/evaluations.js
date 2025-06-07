'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Evaluations extends Model {
    static associate(models) {
      // Định nghĩa quan hệ nếu cần
    }
  }
  Evaluations.init(
    {
      userID: DataTypes.INTEGER,
      evaluator_name: DataTypes.STRING,
      company_name: DataTypes.STRING,
      evaluation_date: DataTypes.DATE,
      evalutationType: DataTypes.STRING,
      average_score: DataTypes.DECIMAL(3, 2),
    },
    {
      sequelize,
      modelName: 'Evaluations',
      freezeTableName: true,
      tableName: 'evaluations',
    }
  );
  return Evaluations;
};
