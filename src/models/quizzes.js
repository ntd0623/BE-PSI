"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Quizzes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Quizzes.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.TEXT("long"),
            duration_minutes: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Quizzes",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "quizzes",     // Đúng với tên bảng trong MySQL
        }
    );
    return Quizzes;
};
