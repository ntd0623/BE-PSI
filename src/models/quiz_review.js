'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Quiz_Review extends Model {
        static associate(models) {
            // Define associations here if needed
            Quiz_Review.belongsTo(models.Quiz_Attempt, {
                as: "attempt",
                foreignKey: "attempt_id",
            });
            Quiz_Review.belongsTo(models.Quizzes_Questions, {
                as: "question",
                foreignKey: "question_id",
            });
        }
    }
    Quiz_Review.init(
        {
            attempt_id: DataTypes.INTEGER,
            question_id: DataTypes.INTEGER,
            selected_answer: DataTypes.INTEGER,
            correct_answer: DataTypes.INTEGER,
            is_correct: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Quiz_Review',
            freezeTableName: true,
            tableName: 'quiz_review',
        }
    );
    return Quiz_Review;
};
