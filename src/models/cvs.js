"use strict";
import { Model, DataTypes } from "sequelize";
export default (sequelize, DataTypes) => {
    class Cvs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Cvs.belongsTo(models.Users, {
                foreignKey: "userID"
            })
        }
    }
    Cvs.init(
        {
            userID: DataTypes.INTEGER,
            file_path: DataTypes.STRING,
            statusCv: DataTypes.STRING,
            submission_date: DataTypes.DATE,
            feedback: DataTypes.TEXT("long"),
        },
        {
            sequelize,
            modelName: "Cvs",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "cvs",     // Đúng với tên bảng trong MySQL
        }
    );
    return Cvs;
};
