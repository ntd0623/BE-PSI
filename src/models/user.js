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
            fullName: DataTypes.STRING,
            roleID: DataTypes.STRING,
            genderID: DataTypes.STRING,
            studentID: DataTypes.STRING,
            school_name: DataTypes.STRING,
            major: DataTypes.STRING,
            year: DataTypes.INTEGER,
            gpa: DataTypes.DECIMAL(3, 2),
            image: DataTypes.BLOB('long'),
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
