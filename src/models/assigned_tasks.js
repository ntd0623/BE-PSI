'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Assigned_Tasks extends Model {
        static associate(models) {
            // Định nghĩa quan hệ nếu có
        }
    }
    Assigned_Tasks.init(
        {
            taskID: DataTypes.INTEGER,
            userID: DataTypes.INTEGER,
            status_assigned: DataTypes.STRING,
            progress_percent: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Assigned_Tasks',
            freezeTableName: true,
            tableName: 'assigned_tasks',
        }
    );
    return Assigned_Tasks;
};
