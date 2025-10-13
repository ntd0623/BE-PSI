'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Class extends Model {
        static associate(models) {
            Class.belongsToMany(models.Users, {
                through: "class_student",
                foreignKey: "class_id",
                otherKey: "student_id",
                as: "students"
            });
            Class.hasMany(models.Quizzes_Schedules, {
                as: "class_schedule",
                foreignKey: "class_id",
                onDelete: "CASCADE",
            });
        }
    }
    Class.init(
        {
            class_code: DataTypes.STRING,
            class_name: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: 'Class',
            freezeTableName: true,
            tableName: 'class',
        }
    );
    return Class;
};
