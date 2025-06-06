"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Quizzes_Results extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Quizzes_Results.init(
        {
            userID: DataTypes.INTEGER,
            quiz_id: DataTypes.INTEGER,
            total_score: DataTypes.DECIMAL(3, 2),
            passed: DataTypes.BOOLEAN,
            submitted_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Quizzes_Results",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "quizzes_results",     // Đúng với tên bảng trong MySQL
        }
    );
    return Quizzes_Results;
};
