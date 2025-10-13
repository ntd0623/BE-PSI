'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Quiz_Question_Attempt extends Model {
        static associate(models) {
            Quiz_Question_Attempt.belongsTo(models.Quiz_Attempt, {
                as: "attempt",
                foreignKey: "attempt_id",
            });
            Quiz_Question_Attempt.belongsTo(models.Quizzes_Questions, {
                as: "question",
                foreignKey: "question_id",
            });
        }
    }

    Quiz_Question_Attempt.init(
        {
            question_id: DataTypes.INTEGER,
            attempt_id: DataTypes.INTEGER,
            order_index: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Quiz_Question_Attempt',
            freezeTableName: true,
            tableName: 'quiz_question_attempt',
        }
    );

    return Quiz_Question_Attempt;
};
