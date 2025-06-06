"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Quizzes_Questions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Quizzes_Questions.init(
        {
            quizID: DataTypes.STRING,
            content: DataTypes.TEXT("long"),
            explanation: DataTypes.TEXT("long"),
        },
        {
            sequelize,
            modelName: "Quizzes_Questions",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "quizzes_questions",     // Đúng với tên bảng trong MySQL
        }
    );
    return Quizzes_Questions;
};
