'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Reports extends Model {
        static associate(models) {
            // define association here if needed
        }
    }
    Reports.init(
        {
            userID: DataTypes.STRING,
            title: DataTypes.STRING,
            description: DataTypes.TEXT('long'),
            reportType: DataTypes.STRING,
            reportStatus: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Reports',
            freezeTableName: true,
            tableName: 'reports',
        }
    );
    return Reports;
};
