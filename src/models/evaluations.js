"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Evaluations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Evaluations.init(
        {
            userID: DataTypes.INTEGER,
            evaluator_name: DataTypes.STRING,
            company_name: DataTypes.STRING,
            evaluation_date: DataTypes.DATE,
            evalutationType: DataTypes.STRING,
            average_score: DataTypes.DECIMAL(3, 2),
        },
        {
            sequelize,
            modelName: "Evaluations",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "evaluations",     // Đúng với tên bảng trong MySQL
        }
    );
    return Evaluations;
};
