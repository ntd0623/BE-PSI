"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Evaluations_Criteria extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Evaluations_Criteria.init(
        {
            evaluationID: DataTypes.INTEGER,
            criterion_name: DataTypes.STRING,
            score: DataTypes.DECIMAL(3, 2),
        },
        {
            sequelize,
            modelName: "Evaluations_Criteria",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "evaluations_criteria",     // Đúng với tên bảng trong MySQL
        }
    );
    return Evaluations_Criteria;
};
