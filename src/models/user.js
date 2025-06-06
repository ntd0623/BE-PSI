"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Users.hasOne(models.Cvs, {
                foreignKey: "userID"
            })
        }
    }
    Users.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            fullName: DataTypes.STRING,
            roleID: DataTypes.STRING,
            genderID: DataTypes.STRING,
            studentID: DataTypes.STRING,
            school_name: DataTypes.STRING,
            major: DataTypes.STRING,
            year: DataTypes.INTEGER,
            gpa: DataTypes.DECIMAL(3, 2),
            image: DataTypes.BLOB("long"),
        },
        {
            sequelize,
            modelName: "Users",
            freezeTableName: true,     // Giữ nguyên tên bảng
            tableName: "users",     // Đúng với tên bảng trong MySQL
        }
    );
    return Users;
};
