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
      userID: {
        type: Sequelize.INTEGER,
      },
      evaluator_name: {
        type: Sequelize.STRING,
      },
      company_name: {
        type: Sequelize.STRING,
      },
      evaluation_DATEONLY: {
        type: Sequelize.DATEONLY,
      },
      evaluationType: { // ✅ sửa chính tả
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
      updatedAT: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("evaluations");
  },
};
