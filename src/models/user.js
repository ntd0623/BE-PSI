'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            Users.hasOne(models.Cvs, { foreignKey: 'userID' });
        }
    }
    Users.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            roleID: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: 'Users',
            freezeTableName: true,
            tableName: 'users',
        }
    );
    return Users;
};
