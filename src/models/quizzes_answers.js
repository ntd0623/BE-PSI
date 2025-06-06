"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Quizzes_Answers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Quizzes_Answers.init(
        {
            questionID: DataTypes.INTEGER,
            content: DataTypes.TEXT("long"),
            isCorrect: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Quizzes_Answers",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "quizzes_answers",     // Đúng với tên bảng trong MySQL
        }
    );
    return Quizzes_Answers;
};
