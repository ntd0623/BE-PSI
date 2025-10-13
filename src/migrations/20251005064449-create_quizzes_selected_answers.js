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
      answer_id: {
        type: Sequelize.INTEGER,
        allowNullL: true,
        references: {
          model: 'quizzes_answers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'quizzes_questions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      is_correct: {
        type: Sequelize.BOOLEAN,
      },
      attempt_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'quiz_attempt',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("quizzes_selected_answers");
  },
};
