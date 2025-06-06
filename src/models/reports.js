"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Reports extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Reports.init(
        {
            userID: DataTypes.STRING,
            title: DataTypes.STRING,
            description: DataTypes.TEXT("long"),
            reportType: DataTypes.STRING,
            reportStatus: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Reports",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "reports",     // Đúng với tên bảng trong MySQL
        }
    );
    return Reports;
};
