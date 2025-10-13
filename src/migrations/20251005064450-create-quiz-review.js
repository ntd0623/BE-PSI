'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quiz_review', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'quizzes_questions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      selected_answer: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'quizzes_answers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      is_correct: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('quiz_review');
  }
};