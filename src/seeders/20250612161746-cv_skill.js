'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cv_Skill', [
      // CV 1: Fullstack Dev
      { cv_id: 1, skill_id: 1, createdAt: new Date(), updatedAt: new Date() }, // Javascript
      { cv_id: 1, skill_id: 2, createdAt: new Date(), updatedAt: new Date() }, // ReactJS
      { cv_id: 1, skill_id: 3, createdAt: new Date(), updatedAt: new Date() }, // NodeJS
      { cv_id: 1, skill_id: 4, createdAt: new Date(), updatedAt: new Date() }, // Team work
      { cv_id: 1, skill_id: 5, createdAt: new Date(), updatedAt: new Date() }, // TOEIC

      // CV 2: Frontend Dev
      { cv_id: 2, skill_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { cv_id: 2, skill_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { cv_id: 2, skill_id: 6, createdAt: new Date(), updatedAt: new Date() }, // HTML/CSS
      { cv_id: 2, skill_id: 8, createdAt: new Date(), updatedAt: new Date() }, // Bootstrap
      { cv_id: 2, skill_id: 9, createdAt: new Date(), updatedAt: new Date() }, // Team work

      // CV 3: Backend Dev
      { cv_id: 3, skill_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { cv_id: 3, skill_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { cv_id: 3, skill_id: 7, createdAt: new Date(), updatedAt: new Date() }, // MySQL
      { cv_id: 3, skill_id: 10, createdAt: new Date(), updatedAt: new Date() }, // Problem Solving

      // CV 4: Tester
      { cv_id: 4, skill_id: 5, createdAt: new Date(), updatedAt: new Date() },
      { cv_id: 4, skill_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { cv_id: 4, skill_id: 12, createdAt: new Date(), updatedAt: new Date() }, // Time Management

      // CV 5: Fresher Developer
      { cv_id: 5, skill_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { cv_id: 5, skill_id: 6, createdAt: new Date(), updatedAt: new Date() },
      { cv_id: 5, skill_id: 9, createdAt: new Date(), updatedAt: new Date() },
      { cv_id: 5, skill_id: 11, createdAt: new Date(), updatedAt: new Date() }, // Communication
      { cv_id: 5, skill_id: 5, createdAt: new Date(), updatedAt: new Date() },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cv_Skill', null, {});
  }
};
