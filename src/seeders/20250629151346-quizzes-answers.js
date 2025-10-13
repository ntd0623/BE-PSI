'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const answers = [
      // Question 1
      { question_id: 1, content: 'object', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 1, content: 'null', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 1, content: 'undefined', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 1, content: 'boolean', is_correct: false, createdAt: now, updatedAt: now },

      // Question 2
      { question_id: 2, content: 'parseInt()', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 2, content: 'parse()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 2, content: 'Number()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 2, content: 'convert()', is_correct: false, createdAt: now, updatedAt: now },

      // Question 3
      { question_id: 3, content: '== so sánh giá trị, === so sánh giá trị và kiểu', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 3, content: '== và === giống nhau', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 3, content: '== chỉ dùng cho số', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 3, content: '=== ép kiểu trước', is_correct: false, createdAt: now, updatedAt: now },

      // Question 4
      { question_id: 4, content: 'Không, NaN không bằng chính nó', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 4, content: 'Có, NaN bằng NaN', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 4, content: 'Chỉ đúng trong strict mode', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 4, content: 'NaN là undefined', is_correct: false, createdAt: now, updatedAt: now },

      // Question 5
      { question_id: 5, content: 'Boolean', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 5, content: 'Array', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 5, content: 'Object', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 5, content: 'Function', is_correct: false, createdAt: now, updatedAt: now },

      // Question 6
      { question_id: 6, content: '"22"', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 6, content: '4', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 6, content: 'NaN', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 6, content: '"4"', is_correct: false, createdAt: now, updatedAt: now },

      // Question 7
      { question_id: 7, content: 'let có block scope, var thì không', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 7, content: 'const có thể thay đổi giá trị', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 7, content: 'var an toàn hơn let', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 7, content: 'let và var giống nhau', is_correct: false, createdAt: now, updatedAt: now },

      // Question 8
      { question_id: 8, content: '(x) => x * x', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 8, content: 'function x() { return x * x }', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 8, content: 'function => x * x', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 8, content: '=> x * x', is_correct: false, createdAt: now, updatedAt: now },

      // Question 9
      { question_id: 9, content: 'Sau call stack, nhờ event loop', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 9, content: 'Ngay lập tức', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 9, content: 'Không bao giờ chạy', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 9, content: 'Sau 1 giây', is_correct: false, createdAt: now, updatedAt: now },

      // Question 10
      { question_id: 10, content: 'Array.isArray()', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 10, content: 'typeof x', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 10, content: 'x instanceof Object', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 10, content: 'isArray(x)', is_correct: false, createdAt: now, updatedAt: now },

      // Question 11
      { question_id: 11, content: 'Tới `this` bên ngoài', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 11, content: 'Có `this` riêng', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 11, content: 'Trỏ tới global object', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 11, content: 'Trỏ tới DOM', is_correct: false, createdAt: now, updatedAt: now },

      // Question 12
      { question_id: 12, content: 'Hàm truyền vào hàm khác', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 12, content: 'Hàm trả về promise', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 12, content: 'Hàm gọi ngay lập tức', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 12, content: 'Không dùng được trong async', is_correct: false, createdAt: now, updatedAt: now },

      // Question 13
      { question_id: 13, content: 'Ghi nhớ phạm vi ngoài', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 13, content: 'Biến toàn cục', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 13, content: 'Hàm không có return', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 13, content: 'Hàm trong async', is_correct: false, createdAt: now, updatedAt: now },

      // Question 14
      { question_id: 14, content: 'callback, Promise, async/await', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 14, content: 'thread, async, defer', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 14, content: 'loop, wait, queue', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 14, content: 'await, wait, sync', is_correct: false, createdAt: now, updatedAt: now },

      // Question 15
      { question_id: 15, content: 'Không thể gán lại, thay đổi object bên trong được', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 15, content: 'Không thể thay đổi bất kỳ thứ gì', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 15, content: 'Chỉ dùng cho số', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 15, content: 'Luôn phải dùng với var', is_correct: false, createdAt: now, updatedAt: now },

      // Question 16
      { question_id: 16, content: 'for...in', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 16, content: 'for...of', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 16, content: 'forEach()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 16, content: 'map()', is_correct: false, createdAt: now, updatedAt: now },

      // Question 17
      { question_id: 17, content: '5', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 17, content: 'undefined', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 17, content: 'error', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 17, content: 'promise', is_correct: false, createdAt: now, updatedAt: now },

      // Question 18
      { question_id: 18, content: 'Mảng mới đã biến đổi', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 18, content: 'Mảng gốc', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 18, content: 'Số phần tử trong mảng', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 18, content: 'Object', is_correct: false, createdAt: now, updatedAt: now },

      // Question 19
      { question_id: 19, content: 'Document Object Model', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 19, content: 'Data Object Model', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 19, content: 'Display Object Mode', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 19, content: 'Design Object Model', is_correct: false, createdAt: now, updatedAt: now },

      // Question 20
      { question_id: 20, content: 'Lan truyền từ con lên cha', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 20, content: 'Từ cha xuống con', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 20, content: 'Chỉ ở phần tử hiện tại', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 20, content: 'Không có sự kiện', is_correct: false, createdAt: now, updatedAt: now },

      // Question 21
      { question_id: 21, content: 'null là giá trị rỗng, undefined là chưa được gán', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 21, content: 'Cả hai đều là null', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 21, content: 'Cả hai đều là undefined', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 21, content: 'null là biến chưa được khai báo', is_correct: false, createdAt: now, updatedAt: now },

      // Question 22
      { question_id: 22, content: 'typeof', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 22, content: 'instanceof', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 22, content: 'typeof()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 22, content: 'isType()', is_correct: false, createdAt: now, updatedAt: now },

      // Question 23
      { question_id: 23, content: 'Arrow function không có this, arguments, và không dùng làm constructor', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 23, content: 'Arrow function nhanh hơn', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 23, content: 'Arrow function có cú pháp dài hơn', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 23, content: 'Regular function luôn return implicit', is_correct: false, createdAt: now, updatedAt: now },

      // Question 24
      { question_id: 24, content: 'Chế độ nghiêm ngặt giúp phát hiện lỗi và hạn chế hành vi không rõ ràng', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 24, content: 'Là chế độ mặc định trong JS', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 24, content: 'Dùng để tăng hiệu suất', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 24, content: 'Giúp code chạy nhanh hơn', is_correct: false, createdAt: now, updatedAt: now },

      // Question 25
      { question_id: 25, content: 'Không thể khai báo lại trong cùng block', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 25, content: 'Có thể khai báo lại bất kỳ đâu', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 25, content: 'Khai báo lại sẽ ghi đè giá trị cũ', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 25, content: 'let chỉ dùng cho vòng lặp', is_correct: false, createdAt: now, updatedAt: now },

      // Question 26
      { question_id: 26, content: 'Định dạng dữ liệu kiểu text dùng để truyền dữ liệu', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 26, content: 'Ngôn ngữ lập trình', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 26, content: 'Công cụ nén dữ liệu', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 26, content: 'Một loại cơ sở dữ liệu', is_correct: false, createdAt: now, updatedAt: now },

      // Question 27
      { question_id: 27, content: 'undefined', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 27, content: 'null', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 27, content: '0', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 27, content: '""', is_correct: false, createdAt: now, updatedAt: now },

      // Question 28
      { question_id: 28, content: 'map()', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 28, content: 'forEach()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 28, content: 'filter()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 28, content: 'reduce()', is_correct: false, createdAt: now, updatedAt: now },

      // Question 29
      { question_id: 29, content: 'Declaration được hoisting, expression thì không', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 29, content: 'Cả hai đều giống nhau', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 29, content: 'Expression nhanh hơn', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 29, content: 'Declaration không thể gán cho biến', is_correct: false, createdAt: now, updatedAt: now },

      // Question 30
      { question_id: 30, content: 'Dùng structuredClone() hoặc JSON.parse(JSON.stringify())', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 30, content: 'Dùng dấu =', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 30, content: 'Dùng toString()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 30, content: 'Dùng Object.assign()', is_correct: false, createdAt: now, updatedAt: now },
      // Question 31
      { question_id: 31, content: 'Symbol là kiểu dữ liệu nguyên thủy tạo ra giá trị duy nhất', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 31, content: 'Symbol là object', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 31, content: 'Symbol là string đặc biệt', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 31, content: 'Symbol là số duy nhất', is_correct: false, createdAt: now, updatedAt: now },

      // Question 32
      { question_id: 32, content: 'Trả về một Promise', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 32, content: 'Trả về undefined', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 32, content: 'Trả về giá trị ngay lập tức', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 32, content: 'Không trả về gì cả', is_correct: false, createdAt: now, updatedAt: now },

      // Question 33
      { question_id: 33, content: 'concat()', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 33, content: 'merge()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 33, content: 'join()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 33, content: 'combine()', is_correct: false, createdAt: now, updatedAt: now },

      // Question 34
      { question_id: 34, content: 'event.preventDefault()', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 34, content: 'stop()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 34, content: 'halt()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 34, content: 'event.stop()', is_correct: false, createdAt: now, updatedAt: now },

      // Question 35
      { question_id: 35, content: 'Gán vào window.tenBien', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 35, content: 'Dùng let bên ngoài hàm', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 35, content: 'Dùng const trong hàm', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 35, content: 'Dùng var trong class', is_correct: false, createdAt: now, updatedAt: now },

      // Question 36
      { question_id: 36, content: 'Tránh lỗi khi ép kiểu tự động không mong muốn', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 36, content: 'Vì == quá chậm', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 36, content: 'Vì === có cú pháp ngắn hơn', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 36, content: 'Vì == không được hỗ trợ nữa', is_correct: false, createdAt: now, updatedAt: now },

      // Question 37
      { question_id: 37, content: 'Immediately Invoked Function Expression', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 37, content: 'Inline Imported Function Expression', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 37, content: 'Important Internal Function Execution', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 37, content: 'IIFE là cú pháp lỗi thời', is_correct: false, createdAt: now, updatedAt: now },

      // Question 38
      { question_id: 38, content: 'Tạo mảng mới gồm các phần tử thỏa điều kiện', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 38, content: 'Thay đổi từng phần tử của mảng', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 38, content: 'Duyệt qua mảng nhưng không thay đổi', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 38, content: 'Tính tổng các phần tử', is_correct: false, createdAt: now, updatedAt: now },

      // Question 39
      { question_id: 39, content: 'Object.create(null)', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 39, content: '{}', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 39, content: 'new Object()', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 39, content: 'Object.from()', is_correct: false, createdAt: now, updatedAt: now },

      // Question 40
      { question_id: 40, content: 'Chuỗi phải dùng dấu ngoặc kép, không chứa hàm hoặc undefined', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 40, content: 'JSON có thể chứa hàm', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 40, content: 'JSON dùng dấu nháy đơn', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 40, content: 'JSON hỗ trợ undefined', is_correct: false, createdAt: now, updatedAt: now },
      // Question 41
      { question_id: 41, content: 'DOMContentLoaded', is_correct: true, createdAt: now, updatedAt: now },
      { question_id: 41, content: 'load', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 41, content: 'onReady', is_correct: false, createdAt: now, updatedAt: now },
      { question_id: 41, content: 'beforeunload', is_correct: false, createdAt: now, updatedAt: now },
    ];

    await queryInterface.bulkInsert('quizzes_answers', answers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quizzes_answers', null, {});
  }
};
