"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("evaluations_criteria", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      evaluation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      criterion_name: {
        type: Sequelize.STRING,
      },
      score: {
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
    await queryInterface.dropTable("evaluations_criteria");
  },
};
