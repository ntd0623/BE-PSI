'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            Users.hasOne(models.Cvs, { foreignKey: 'user_id' });
            Users.hasMany(models.Quizzes_Results, {
                foreignKey: 'user_id',
                as: 'quizResults',
            });
            Users.hasMany(models.Quiz_Attempt, {
                as: "attempts",
                foreignKey: "user_id",
            });
            Users.belongsToMany(models.Class, {
                through: "class_student",
                foreignKey: "student_id",
                otherKey: "class_id",
                as: "classes"
            });
        }
    }
    Users.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role_id: DataTypes.STRING,
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
