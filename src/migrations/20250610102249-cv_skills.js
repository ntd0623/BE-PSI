"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cv_skill", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cv_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cvs',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      skill_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'skills',
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
    await queryInterface.dropTable("cv_skill");
  },
};
