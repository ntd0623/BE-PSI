'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Quizzes_Schedules extends Model {
        static associate(models) {
            // Define associations here if needed
            Quizzes_Schedules.belongsTo(models.Quizzes, {
                as: "quiz",
                foreignKey: "quiz_id",
                onDelete: "CASCADE",
            });
            Quizzes_Schedules.hasMany(models.Quiz_Attempt, {
                as: "attempts",
                foreignKey: "schedule_id",
                onDelete: "CASCADE",
            });
            Quizzes_Schedules.belongsTo(models.Class, {
                as: "quiz_schedule_class",
                foreignKey: "class_id",
                onDelete: "CASCADE",
            });
        }
    }
    Quizzes_Schedules.init(
        {
            quiz_id: DataTypes.INTEGER,
            start_time: DataTypes.DATE,
            end_time: DataTypes.DATE,
            attempt_limit: DataTypes.INTEGER,
            shuffle_question: DataTypes.BOOLEAN,
            shuffle_answer: DataTypes.BOOLEAN,
            exam_code: DataTypes.STRING,
            class_id: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Quizzes_Schedules',
            freezeTableName: true,
            tableName: 'quiz_schedules',
        }
    );
    return Quizzes_Schedules;
};
