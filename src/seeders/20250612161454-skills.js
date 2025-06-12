'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('skills', [
      // 🧠 Programming skills
      { name: 'Javascript', type: 'programming', createdAt: new Date(), updatedAt: new Date() },
      { name: 'ReactJS', type: 'programming', createdAt: new Date(), updatedAt: new Date() },
      { name: 'NodeJS', type: 'programming', createdAt: new Date(), updatedAt: new Date() },
      { name: 'HTML/CSS', type: 'programming', createdAt: new Date(), updatedAt: new Date() },
      { name: 'MySQL', type: 'programming', createdAt: new Date(), updatedAt: new Date() },
      { name: 'MongoDB', type: 'programming', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tailwind CSS', type: 'programming', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bootstrap', type: 'programming', createdAt: new Date(), updatedAt: new Date() },

      // 🧩 Soft skills
      { name: 'Team work', type: 'softSkills', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Problem Solving', type: 'softSkills', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Communication', type: 'softSkills', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Time Management', type: 'softSkills', createdAt: new Date(), updatedAt: new Date() },

      // 🌐 Languages / Certifications
      { name: 'TOEIC 450', type: 'languages', createdAt: new Date(), updatedAt: new Date() },
      { name: 'TOEIC 600', type: 'languages', createdAt: new Date(), updatedAt: new Date() },
      { name: 'IELTS 5.5', type: 'languages', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Japanese N5', type: 'languages', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('skills', null, {});
  }
};
