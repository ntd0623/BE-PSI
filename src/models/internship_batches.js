"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Internship_Batches extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Internship_Batches.init(
        {
            userID: DataTypes.INTEGER,
            name: DataTypes.STRING,
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Internship_Batches",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "internship_batches",     // Đúng với tên bảng trong MySQL
        }
    );
    return Internship_Batches;
};
