'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('internship_tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT('long'),
      },
      priorityID: {
        type: Sequelize.STRING,
      },
      deadline: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('internship_tasks'); // ⚠ sửa đúng tên bảng ở đây
  },
};
