"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Projects extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Projects.init(
        {
            userID: DataTypes.INTEGER,
            title: DataTypes.STRING,
            description: DataTypes.TEXT("long"),
            statusProject: DataTypes.STRING,
            progress_percent: DataTypes.INTEGER,
            submisstion_date: DataTypes.DATE,
            score: DataTypes.DECIMAL(3, 2),
        },
        {
            sequelize,
            modelName: "Projects",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "projects",     // Đúng với tên bảng trong MySQL
        }
    );
    return Projects;
};
