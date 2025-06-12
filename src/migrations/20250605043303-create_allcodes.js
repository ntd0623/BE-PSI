'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('allcodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      key: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      value_EN: {
        type: Sequelize.STRING,
      },
      value_VI: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('allcodes');
  },
};
