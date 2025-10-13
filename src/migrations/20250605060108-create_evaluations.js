"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("evaluations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      evaluator_name: {
        type: Sequelize.STRING,
      },
      company_name: {
        type: Sequelize.STRING,
      },
      evaluation_date: {
        type: Sequelize.DATEONLY,
      },
      evaluation_type: { // ✅ sửa chính tả
        type: Sequelize.STRING,
      },
      average_score: {
        type: Sequelize.DECIMAL(3, 2),
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
    await queryInterface.dropTable("evaluations");
  },
};
