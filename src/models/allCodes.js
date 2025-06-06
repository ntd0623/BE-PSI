"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Allcodes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Allcodes.init(
        {
            key: DataTypes.STRING,
            type: DataTypes.STRING,
            value_EN: DataTypes.STRING,
            value_VI: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Allcodes",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "allcodes",     // Đúng với tên bảng trong MySQL
        }
    );
    return Allcodes;
};
