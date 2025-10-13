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
            user_id: DataTypes.STRING,
            title: DataTypes.STRING,
            description: DataTypes.TEXT('long'),
            report_type: DataTypes.STRING,
            report_status: DataTypes.STRING,
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
