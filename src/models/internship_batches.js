'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Internship_Batches extends Model {
    static associate(models) {
      // Định nghĩa quan hệ nếu cần
      Internship_Batches.hasMany(models.Cvs, {
        foreignKey: 'batchID',
        as: 'cvs'
      });
      Internship_Batches.belongsTo(models.Allcodes,
        {
          foreignKey: 'name',
          targetKey: "key",
          as: "dataInternship"
        }
      )
    }
  }
  Internship_Batches.init(
    {
      name: DataTypes.STRING,
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
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
