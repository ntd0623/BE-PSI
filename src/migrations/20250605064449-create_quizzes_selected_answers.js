"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("quizzes_selected_answers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quiz_result_id: {
        type: Sequelize.INTEGER,
      },
      answer_id: {
        type: Sequelize.INTEGER,
      },
      question_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      updatedAT: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("quizzes_selected_answers");
  },
};
