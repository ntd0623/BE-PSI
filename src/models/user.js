'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            Users.hasOne(models.Cvs, { foreignKey: 'userID' });
            Users.hasMany(models.Quizzes_Results, {
                foreignKey: 'userID',
                as: 'quizResults',
            });
        }
    }
    Users.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            roleID: DataTypes.STRING,
            name: DataTypes.STRING,
            avatar: DataTypes.STRING,
            provider: DataTypes.STRING,
            access_token: DataTypes.TEXT,

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
