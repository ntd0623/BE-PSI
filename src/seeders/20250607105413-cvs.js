'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cvs', [
      {
        userID: 1,
        file_path: 'cv1.pdf',
        statusCv: 'CV1', // Ví dụ: 'Đã nộp'
        submission_date: new Date('2025-05-01'),
        feedback: 'CV đạt yêu cầu, cần bổ sung thêm phần kỹ năng.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: 2,
        file_path: 'cv2.pdf',
        statusCv: 'CV1',
        submission_date: new Date('2025-05-02'),
        feedback: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: 3,
        file_path: 'cv3.pdf',
        statusCv: 'CV1', // 'Đạt yêu cầu'
        submission_date: new Date('2025-05-03'),
        feedback: 'CV rất tốt, phù hợp vị trí.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: 4,
        file_path: 'cv4.pdf',
        statusCv: 'CV1',
        submission_date: new Date('2025-05-04'),
        feedback: 'CV chưa đúng yêu cầu, cần chỉnh sửa.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cvs', null, {});
  }
};
