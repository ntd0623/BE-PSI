"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Assigned_Tasks extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Assigned_Tasks.init(
        {
            taskID: DataTypes.INTEGER,
            userID: DataTypes.INTEGER,
            status_assigned: DataTypes.STRING,
            progress_percent: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Assigned_Tasks",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "assigned_tasks",     // Đúng với tên bảng trong MySQL
        }
    );
    return Assigned_Tasks;
};
