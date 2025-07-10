'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const answers = [
      // Question 1
      { questionID: 1, content: 'object', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 1, content: 'null', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 1, content: 'undefined', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 1, content: 'boolean', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 2
      { questionID: 2, content: 'parseInt()', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 2, content: 'parse()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 2, content: 'Number()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 2, content: 'convert()', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 3
      { questionID: 3, content: '== so sánh giá trị, === so sánh giá trị và kiểu', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 3, content: '== và === giống nhau', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 3, content: '== chỉ dùng cho số', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 3, content: '=== ép kiểu trước', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 4
      { questionID: 4, content: 'Không, NaN không bằng chính nó', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 4, content: 'Có, NaN bằng NaN', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 4, content: 'Chỉ đúng trong strict mode', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 4, content: 'NaN là undefined', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 5
      { questionID: 5, content: 'Boolean', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 5, content: 'Array', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 5, content: 'Object', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 5, content: 'Function', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 6
      { questionID: 6, content: '"22"', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 6, content: '4', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 6, content: 'NaN', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 6, content: '"4"', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 7
      { questionID: 7, content: 'let có block scope, var thì không', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 7, content: 'const có thể thay đổi giá trị', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 7, content: 'var an toàn hơn let', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 7, content: 'let và var giống nhau', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 8
      { questionID: 8, content: '(x) => x * x', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 8, content: 'function x() { return x * x }', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 8, content: 'function => x * x', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 8, content: '=> x * x', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 9
      { questionID: 9, content: 'Sau call stack, nhờ event loop', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 9, content: 'Ngay lập tức', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 9, content: 'Không bao giờ chạy', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 9, content: 'Sau 1 giây', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 10
      { questionID: 10, content: 'Array.isArray()', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 10, content: 'typeof x', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 10, content: 'x instanceof Object', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 10, content: 'isArray(x)', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 11
      { questionID: 11, content: 'Tới `this` bên ngoài', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 11, content: 'Có `this` riêng', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 11, content: 'Trỏ tới global object', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 11, content: 'Trỏ tới DOM', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 12
      { questionID: 12, content: 'Hàm truyền vào hàm khác', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 12, content: 'Hàm trả về promise', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 12, content: 'Hàm gọi ngay lập tức', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 12, content: 'Không dùng được trong async', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 13
      { questionID: 13, content: 'Ghi nhớ phạm vi ngoài', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 13, content: 'Biến toàn cục', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 13, content: 'Hàm không có return', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 13, content: 'Hàm trong async', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 14
      { questionID: 14, content: 'callback, Promise, async/await', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 14, content: 'thread, async, defer', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 14, content: 'loop, wait, queue', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 14, content: 'await, wait, sync', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 15
      { questionID: 15, content: 'Không thể gán lại, thay đổi object bên trong được', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 15, content: 'Không thể thay đổi bất kỳ thứ gì', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 15, content: 'Chỉ dùng cho số', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 15, content: 'Luôn phải dùng với var', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 16
      { questionID: 16, content: 'for...in', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 16, content: 'for...of', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 16, content: 'forEach()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 16, content: 'map()', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 17
      { questionID: 17, content: '5', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 17, content: 'undefined', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 17, content: 'error', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 17, content: 'promise', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 18
      { questionID: 18, content: 'Mảng mới đã biến đổi', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 18, content: 'Mảng gốc', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 18, content: 'Số phần tử trong mảng', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 18, content: 'Object', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 19
      { questionID: 19, content: 'Document Object Model', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 19, content: 'Data Object Model', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 19, content: 'Display Object Mode', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 19, content: 'Design Object Model', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 20
      { questionID: 20, content: 'Lan truyền từ con lên cha', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 20, content: 'Từ cha xuống con', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 20, content: 'Chỉ ở phần tử hiện tại', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 20, content: 'Không có sự kiện', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 21
      { questionID: 21, content: 'null là giá trị rỗng, undefined là chưa được gán', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 21, content: 'Cả hai đều là null', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 21, content: 'Cả hai đều là undefined', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 21, content: 'null là biến chưa được khai báo', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 22
      { questionID: 22, content: 'typeof', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 22, content: 'instanceof', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 22, content: 'typeof()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 22, content: 'isType()', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 23
      { questionID: 23, content: 'Arrow function không có this, arguments, và không dùng làm constructor', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 23, content: 'Arrow function nhanh hơn', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 23, content: 'Arrow function có cú pháp dài hơn', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 23, content: 'Regular function luôn return implicit', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 24
      { questionID: 24, content: 'Chế độ nghiêm ngặt giúp phát hiện lỗi và hạn chế hành vi không rõ ràng', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 24, content: 'Là chế độ mặc định trong JS', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 24, content: 'Dùng để tăng hiệu suất', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 24, content: 'Giúp code chạy nhanh hơn', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 25
      { questionID: 25, content: 'Không thể khai báo lại trong cùng block', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 25, content: 'Có thể khai báo lại bất kỳ đâu', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 25, content: 'Khai báo lại sẽ ghi đè giá trị cũ', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 25, content: 'let chỉ dùng cho vòng lặp', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 26
      { questionID: 26, content: 'Định dạng dữ liệu kiểu text dùng để truyền dữ liệu', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 26, content: 'Ngôn ngữ lập trình', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 26, content: 'Công cụ nén dữ liệu', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 26, content: 'Một loại cơ sở dữ liệu', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 27
      { questionID: 27, content: 'undefined', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 27, content: 'null', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 27, content: '0', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 27, content: '""', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 28
      { questionID: 28, content: 'map()', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 28, content: 'forEach()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 28, content: 'filter()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 28, content: 'reduce()', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 29
      { questionID: 29, content: 'Declaration được hoisting, expression thì không', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 29, content: 'Cả hai đều giống nhau', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 29, content: 'Expression nhanh hơn', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 29, content: 'Declaration không thể gán cho biến', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 30
      { questionID: 30, content: 'Dùng structuredClone() hoặc JSON.parse(JSON.stringify())', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 30, content: 'Dùng dấu =', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 30, content: 'Dùng toString()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 30, content: 'Dùng Object.assign()', isCorrect: false, createdAt: now, updatedAt: now },
      // Question 31
      { questionID: 31, content: 'Symbol là kiểu dữ liệu nguyên thủy tạo ra giá trị duy nhất', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 31, content: 'Symbol là object', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 31, content: 'Symbol là string đặc biệt', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 31, content: 'Symbol là số duy nhất', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 32
      { questionID: 32, content: 'Trả về một Promise', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 32, content: 'Trả về undefined', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 32, content: 'Trả về giá trị ngay lập tức', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 32, content: 'Không trả về gì cả', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 33
      { questionID: 33, content: 'concat()', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 33, content: 'merge()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 33, content: 'join()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 33, content: 'combine()', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 34
      { questionID: 34, content: 'event.preventDefault()', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 34, content: 'stop()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 34, content: 'halt()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 34, content: 'event.stop()', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 35
      { questionID: 35, content: 'Gán vào window.tenBien', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 35, content: 'Dùng let bên ngoài hàm', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 35, content: 'Dùng const trong hàm', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 35, content: 'Dùng var trong class', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 36
      { questionID: 36, content: 'Tránh lỗi khi ép kiểu tự động không mong muốn', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 36, content: 'Vì == quá chậm', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 36, content: 'Vì === có cú pháp ngắn hơn', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 36, content: 'Vì == không được hỗ trợ nữa', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 37
      { questionID: 37, content: 'Immediately Invoked Function Expression', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 37, content: 'Inline Imported Function Expression', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 37, content: 'Important Internal Function Execution', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 37, content: 'IIFE là cú pháp lỗi thời', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 38
      { questionID: 38, content: 'Tạo mảng mới gồm các phần tử thỏa điều kiện', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 38, content: 'Thay đổi từng phần tử của mảng', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 38, content: 'Duyệt qua mảng nhưng không thay đổi', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 38, content: 'Tính tổng các phần tử', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 39
      { questionID: 39, content: 'Object.create(null)', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 39, content: '{}', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 39, content: 'new Object()', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 39, content: 'Object.from()', isCorrect: false, createdAt: now, updatedAt: now },

      // Question 40
      { questionID: 40, content: 'Chuỗi phải dùng dấu ngoặc kép, không chứa hàm hoặc undefined', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 40, content: 'JSON có thể chứa hàm', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 40, content: 'JSON dùng dấu nháy đơn', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 40, content: 'JSON hỗ trợ undefined', isCorrect: false, createdAt: now, updatedAt: now },
      // Question 41
      { questionID: 41, content: 'DOMContentLoaded', isCorrect: true, createdAt: now, updatedAt: now },
      { questionID: 41, content: 'load', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 41, content: 'onReady', isCorrect: false, createdAt: now, updatedAt: now },
      { questionID: 41, content: 'beforeunload', isCorrect: false, createdAt: now, updatedAt: now },
    ];

    await queryInterface.bulkInsert('quizzes_answers', answers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quizzes_answers', null, {});
  }
};
