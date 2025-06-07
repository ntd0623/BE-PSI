'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cvs extends Model {
        static associate(models) {
            Cvs.belongsTo(models.Users, {
                foreignKey: 'userID'
            });
        }
    }
    Cvs.init(
        {
            userID: DataTypes.INTEGER,
            file_path: DataTypes.STRING,
            statusCv: DataTypes.STRING,
            submission_date: DataTypes.DATE,
            feedback: DataTypes.TEXT('long'),
        },
        {
            sequelize,
            modelName: 'Cvs',
            freezeTableName: true,
            tableName: 'cvs',
        }
    );
    return Cvs;
};
