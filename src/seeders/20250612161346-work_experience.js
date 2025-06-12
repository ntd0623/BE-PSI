'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('work_Experiences', [
      {
        cv_id: 1,
        position: 'Fullstack Developer',
        company: 'PLT Solution',
        description: 'Làm web theo hướng dẫn của thầy',
        start_date: '2025-05-14',
        end_date: '2025-07-31',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cv_id: 2,
        position: 'Frontend Intern',
        company: 'GHTK Tech',
        description: 'Thực tập ReactJS, tham gia bảo trì UI hệ thống logistics',
        start_date: '2025-04-01',
        end_date: '2025-06-30',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cv_id: 3,
        position: 'AI Research Assistant',
        company: 'VinAI Research',
        description: 'Hỗ trợ thu thập và xử lý dữ liệu cho mô hình NLP',
        start_date: '2024-12-15',
        end_date: '2025-05-15',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cv_id: 4,
        position: 'Backend Intern',
        company: 'Misa JSC',
        description: 'Viết API bằng Node.js, kết nối MongoDB cho hệ thống kế toán',
        start_date: '2025-01-10',
        end_date: '2025-03-31',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cv_id: 5,
        position: 'UI/UX Designer Intern',
        company: 'TMA Solutions',
        description: 'Thiết kế wireframe và prototype bằng Figma cho dự án nội bộ',
        start_date: '2025-03-01',
        end_date: '2025-05-30',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('work_Experiences', null, {});
  }
};
