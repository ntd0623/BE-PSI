'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Quiz_Attempt extends Model {
        static associate(models) {
            Quiz_Attempt.belongsTo(models.Quizzes, {
                as: "quiz",
                foreignKey: "quiz_id",
            });
            Quiz_Attempt.belongsTo(models.Users, {
                as: "user",
                foreignKey: "user_id",
            });
            Quiz_Attempt.hasMany(models.Quiz_Question_Attempt, {
                as: "question_attempts",
                foreignKey: "attempt_id",
                onDelete: "CASCADE",
            });
            Quiz_Attempt.hasMany(models.Quizzes_Selected_Answers, {
                as: "selected_answers",
                foreignKey: "attempt_id",
                onDelete: "CASCADE",
            });
            Quiz_Attempt.hasOne(models.Quizzes_Results, {
                as: "result",
                foreignKey: "attempt_id",
                onDelete: "CASCADE",
            });
            Quiz_Attempt.belongsTo(models.Allcodes, { as: "status_attempt", foreignKey: "status", onDelete: "CASCADE", })
            Quiz_Attempt.belongsTo(models.Quizzes_Schedules, { as: "schedule", foreignKey: "schedule_id", onDelete: "CASCADE", })
        }
    }

    Quiz_Attempt.init(
        {
            schedule_id: DataTypes.INTEGER,
            quiz_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            start_time: DataTypes.DATE,
            end_time: DataTypes.DATE,
            duration: DataTypes.INTEGER,
            time_left: DataTypes.FLOAT,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Quiz_Attempt',
            freezeTableName: true,
            tableName: 'quiz_attempt',
        }
    );

    return Quiz_Attempt;
};
