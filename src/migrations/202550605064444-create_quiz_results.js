"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("quizzes_results", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'quizzes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      attempt_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'quiz_attempt',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      total_score: {
        type: Sequelize.DECIMAL(4, 2),
      },
      passed: {
        type: Sequelize.BOOLEAN,
      },
      submitted_at: {
        type: Sequelize.DATE,
      },
      total_correct: {
        type: Sequelize.INTEGER,
        field: 'total_correct',
        allowNull: true,
      },
      total_question: {
        type: Sequelize.INTEGER,
      },
      duration_used: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("quizzes_results");
  },
};
