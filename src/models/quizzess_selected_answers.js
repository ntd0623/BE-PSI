"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Quizzes_Selected_Answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Quizzes_Selected_Answers.init(
    {
      quiz_result_id: DataTypes.INTEGER,
      answer_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Quizzes_Selected_Answers",
      freezeTableName: true,     // Giữ nguyên tên bảng
      tableName: "quizzes_selected_answers",     // Đúng với tên bảng trong MySQL
    }
  );
  return Quizzes_Selected_Answers;
};
