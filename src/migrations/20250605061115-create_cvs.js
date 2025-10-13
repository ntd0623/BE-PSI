"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cvs", {
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
      full_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      birth_day: {
        type: Sequelize.DATEONLY,
      },
      gender_id: {
        type: Sequelize.STRING,
        references: {
          model: 'allcodes',
          key: 'key',
        },
        onDelete: 'CASCADE',
      },
      address: {
        type: Sequelize.STRING,
      },
      school_name: {
        type: Sequelize.STRING,
      },
      major: {
        type: Sequelize.STRING,
      },
      degree_id: {
        type: Sequelize.STRING,
      },
      gpa: {
        type: Sequelize.DECIMAL(3, 2),
      },
      graduation_year: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.BLOB('long'),
      },
      status_cv: {
        type: Sequelize.STRING,
      },
      submission_date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      feedback: {
        type: Sequelize.TEXT("long"),
      },
      career_objective: {
        type: Sequelize.STRING,
      },
      archivement: {
        type: Sequelize.STRING,
      },
      references: {
        type: Sequelize.STRING,
      },
      batch_id: {
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
    await queryInterface.dropTable("cvs");
  },
};
