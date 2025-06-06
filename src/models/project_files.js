"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Project_Files extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Project_Files.init(
        {
            projectID: DataTypes.INTEGER,
            file_path: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Project_Files",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "project_files",     // Đúng với tên bảng trong MySQL
        }
    );
    return Project_Files;
};
