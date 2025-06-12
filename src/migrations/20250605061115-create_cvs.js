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
      userID: {
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      birthDay: {
        type: Sequelize.DATEONLY,
      },
      genderID: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      schoolName: {
        type: Sequelize.STRING,
      },
      major: {
        type: Sequelize.STRING,
      },
      degreeID: {
        type: Sequelize.STRING,
      },
      gpa: {
        type: Sequelize.DECIMAL(3, 2),
      },
      graduationYear: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.BLOB('long'),
      },
      statusCv: {
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
    await queryInterface.dropTable("cvs");
  },
};
