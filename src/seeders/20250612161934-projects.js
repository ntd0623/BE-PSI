'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('projects', [
      // CV 1
      {
        cv_id: 1,
        name: 'Booking Care',
        description: 'Trang web đặt lịch khám bệnh online. Có tích hợp gọi API, tìm bác sĩ, đặt lịch và quản lý hồ sơ bệnh nhân.',
        role: 'Fullstack Developer',
        technologies: 'React, Node.js, MySQL, Postman',
        github_url: 'https://github.com/ntd0623/bookingcare-ReactJS',
        demo_url: 'https://bookingcare-demo.com',
        start_date: '2025-03-01',
        end_date: '2025-05-30',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cv_id: 1,
        name: 'Movie Ticket Web',
        description: 'Hệ thống đặt vé xem phim với phân quyền người dùng, thanh toán bằng Momo QR.',
        role: 'Frontend Developer',
        technologies: 'React, Redux, Tailwind, Node.js, Sequelize',
        github_url: 'https://github.com/tr-nam/movies_ticket_web',
        demo_url: 'https://movieticket-demo.com',
        start_date: '2025-04-01',
        end_date: '2025-06-10',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // CV 2
      {
        cv_id: 2,
        name: 'E-learning Platform',
        description: 'Nền tảng học trực tuyến hỗ trợ học viên và giảng viên, có video, bài quiz và bảng điều khiển.',
        role: 'Frontend Developer',
        technologies: 'React, Bootstrap, Firebase',
        github_url: 'https://github.com/example/elearning',
        demo_url: null,
        start_date: '2025-01-15',
        end_date: '2025-03-20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cv_id: 2,
        name: 'Portfolio Website',
        description: 'Trang web cá nhân giới thiệu kỹ năng và dự án.',
        role: 'UI/UX Designer & Developer',
        technologies: 'HTML, CSS, JavaScript',
        github_url: 'https://github.com/example/portfolio',
        demo_url: 'https://portfolio-demo.com',
        start_date: '2025-02-01',
        end_date: '2025-02-20',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // CV 3
      {
        cv_id: 3,
        name: 'CMS Blog System',
        description: 'Hệ thống quản lý nội dung cho blog, có phân quyền admin và người dùng.',
        role: 'Backend Developer',
        technologies: 'Node.js, Express, MySQL, Sequelize',
        github_url: 'https://github.com/example/blogcms',
        demo_url: null,
        start_date: '2025-03-10',
        end_date: '2025-04-30',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cv_id: 3,
        name: 'API for E-commerce',
        description: 'Xây dựng API RESTful cho website bán hàng online.',
        role: 'Backend Developer',
        technologies: 'Node.js, Sequelize, JWT, MySQL',
        github_url: 'https://github.com/example/ecommerce-api',
        demo_url: null,
        start_date: '2025-05-01',
        end_date: '2025-06-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // CV 4
      {
        cv_id: 4,
        name: 'Test Automation',
        description: 'Viết test case và test tự động cho ứng dụng web.',
        role: 'Tester',
        technologies: 'Selenium, Mocha, Chai',
        github_url: null,
        demo_url: null,
        start_date: '2025-02-15',
        end_date: '2025-04-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cv_id: 4,
        name: 'Bug Tracking System',
        description: 'Xây dựng hệ thống theo dõi và quản lý lỗi phần mềm.',
        role: 'QA Engineer',
        technologies: 'Jira, Git, Node.js',
        github_url: null,
        demo_url: null,
        start_date: '2025-03-10',
        end_date: '2025-05-15',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // CV 5
      {
        cv_id: 5,
        name: 'Todo App',
        description: 'Ứng dụng quản lý công việc cá nhân.',
        role: 'Frontend Intern',
        technologies: 'React, TailwindCSS',
        github_url: 'https://github.com/example/todo',
        demo_url: null,
        start_date: '2025-01-01',
        end_date: '2025-01-20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cv_id: 5,
        name: 'Weather App',
        description: 'App hiển thị thời tiết hiện tại theo vị trí người dùng.',
        role: 'Frontend Intern',
        technologies: 'React, OpenWeather API',
        github_url: 'https://github.com/example/weatherapp',
        demo_url: null,
        start_date: '2025-02-01',
        end_date: '2025-02-15',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
