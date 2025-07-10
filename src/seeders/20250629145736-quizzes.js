'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('quizzes', [
      {
        title: 'Bộ câu hỏi về PHP cơ bản',
        image: null,
        description: 'Bộ câu hỏi kiểm tra kiến thức nền tảng về PHP.',
        duration_minutes: 60,
        score: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bộ câu hỏi về Database',
        image: null,
        description: 'Bộ câu hỏi kiểm tra kiến thức cơ sở dữ liệu như MySQL, PostgreSQL, SQL Server.',
        duration_minutes: 60,
        score: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bộ câu hỏi về Kiểm thử phần mềm',
        image: null,
        description: 'Bộ đề trắc nghiệm về quy trình kiểm thử, test case, bug, v.v.',
        duration_minutes: 60,
        score: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bộ câu hỏi về JavaScript',
        image: null,
        description: 'Đánh giá kiến thức JavaScript từ ES5 đến ES6+, bao gồm closure, async/await, DOM, v.v.',
        duration_minutes: 60,
        score: 10,

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bộ câu hỏi về Git & GitHub',
        image: null,
        description: 'Câu hỏi trắc nghiệm kiểm tra kiến thức dùng Git cơ bản và thao tác với GitHub.',
        duration_minutes: 60,
        score: 10,

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bộ câu hỏi về HTML/CSS',
        image: null,
        description: 'Bộ câu hỏi về cấu trúc HTML5, thẻ semantic, Flexbox, Grid, CSS selector, v.v.',
        duration_minutes: 60,
        score: 10,

        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quizzes', {
      title: {
        [Sequelize.Op.in]: [
          'Bộ câu hỏi về PHP cơ bản',
          'Bộ câu hỏi về Database',
          'Bộ câu hỏi về Kiểm thử phần mềm',
          'Bộ câu hỏi về JavaScript',
          'Bộ câu hỏi về Git & GitHub',
          'Bộ câu hỏi về HTML/CSS'
        ]
      }
    }, {});
  }
};
