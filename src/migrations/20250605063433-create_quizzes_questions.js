"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("quizzes_questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'quizzes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      content: {
        type: Sequelize.TEXT("long"),
      },
      explanation: {
        type: Sequelize.TEXT("long"),
      },
      type: {
        type: Sequelize.STRING,
        references: {
          model: 'allcodes',
          key: 'key',
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
    await queryInterface.dropTable("quizzes_questions");
  },
};
