'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Class_Student extends Model {
        static associate(models) {
            
        }
    }
    Class_Student.init(
        {
            student_id: DataTypes.INTEGER,
            class_id: DataTypes.INTEGER,

        },
        {
            sequelize,
            modelName: 'Class_Student',
            freezeTableName: true,
            tableName: 'class_student',
        }
    );
    return Class_Student;
};
