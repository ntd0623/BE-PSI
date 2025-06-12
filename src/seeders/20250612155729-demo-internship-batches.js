module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('internship_batches', [
      {
        name: 'IB1',
        start_date: '2025-03-01',
        end_date: '2024-06-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'IB2',
        start_date: '2025-09-01',
        end_date: '2025-12-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('internship_batches', null, {});
  }
};