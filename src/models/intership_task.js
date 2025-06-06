"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Internship_Tasks extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Internship_Tasks.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.TEXT("long"),
            priorityID: DataTypes.STRING,
            deadline: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Internship_Tasks",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "internship_tasks",     // Đúng với tên bảng trong MySQL
        }
    );
    return Internship_Tasks;
};
