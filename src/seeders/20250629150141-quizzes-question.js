'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('quizzes_questions', [
      {
        quizID: 4,
        content: '`typeof null` trả về kết quả gì?',
        explanation: 'Trong JavaScript, typeof null là "object" – đây là một bug lịch sử.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Hàm nào dùng để chuyển chuỗi thành số nguyên?',
        explanation: '`parseInt()` chuyển chuỗi sang số nguyên.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: '`==` khác `===` như thế nào?',
        explanation: '`===` so sánh kiểu và giá trị, `==` ép kiểu trước khi so sánh.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: '`NaN === NaN` có đúng không?',
        explanation: 'Không. NaN không bằng chính nó trong JavaScript.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Đâu là kiểu dữ liệu primitive trong JS?',
        explanation: 'Boolean là primitive, còn Object và Array là kiểu tham chiếu.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Kết quả của `2 + "2"` là gì?',
        explanation: 'Chuỗi "2" làm JS ép kiểu số thành chuỗi → "22".',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: '`let`, `var`, `const` khác nhau như thế nào?',
        explanation: '`const` không cho gán lại, `let` và `var` khác nhau về phạm vi (scope).',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Hàm nào dưới đây là hàm mũi tên?',
        explanation: 'Arrow function ví dụ: `(x) => x * x`.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: '`setTimeout(..., 0)` chạy khi nào?',
        explanation: 'Sau khi call stack trống – do event loop.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Cách kiểm tra một biến có phải là mảng?',
        explanation: 'Array.isArray(x) là phương pháp chính xác.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: '`this` trong arrow function trỏ đến đâu?',
        explanation: 'Arrow function không có `this` riêng – kế thừa theo lexical scope.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Callback là gì?',
        explanation: 'Callback là hàm được truyền vào một hàm khác để gọi lại.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Closure là gì?',
        explanation: 'Closure là khi một hàm ghi nhớ được phạm vi bên ngoài nó.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Cách xử lý bất đồng bộ trong JS gồm:',
        explanation: 'callback, Promise, async/await là 3 cách chính.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Biến const có thể làm gì?',
        explanation: 'Không thể gán lại, nhưng có thể thay đổi object bên trong.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Câu nào dùng để duyệt key trong object?',
        explanation: '`for...in` dùng để duyệt key của object.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: '`Promise.resolve(5).then(console.log)` in ra?',
        explanation: 'In ra 5 vì resolve() tạo promise với value là 5.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: '`Array.prototype.map()` trả về gì?',
        explanation: 'Trả về mảng mới sau khi biến đổi phần tử.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'DOM là gì?',
        explanation: 'DOM là Document Object Model – mô hình HTML dạng cây.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Event bubbling là gì?',
        explanation: 'Sự kiện lan từ phần tử con lên cha.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Sự khác nhau giữa null và undefined là gì?',
        explanation: 'null là giá trị rỗng do lập trình viên gán; undefined là chưa được gán.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Toán tử nào được dùng để kiểm tra kiểu dữ liệu?',
        explanation: '`typeof` trả về kiểu dữ liệu dưới dạng chuỗi.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Sự khác nhau giữa arrow function và regular function?',
        explanation: 'Arrow function không có `this`, `arguments`, và không dùng làm constructor.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'strict mode là gì?',
        explanation: 'Chế độ nghiêm ngặt giúp phát hiện lỗi và hạn chế hành vi không rõ ràng.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Có thể khai báo lại biến với let không?',
        explanation: 'Không. `let` chỉ được khai báo một lần trong cùng block.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'JSON là gì?',
        explanation: 'JSON là định dạng dữ liệu kiểu text dùng để truyền dữ liệu.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Giá trị mặc định của biến khai báo nhưng chưa gán là gì?',
        explanation: 'undefined',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Phương thức nào để duyệt mảng và thay đổi giá trị?',
        explanation: '`map()` trả về mảng mới với giá trị được biến đổi.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Function declaration và expression khác nhau chỗ nào?',
        explanation: 'Declaration được hoisting còn expression thì không.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Làm sao để sao chép object không bị tham chiếu?',
        explanation: 'Dùng structuredClone() hoặc JSON.parse(JSON.stringify()).',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Symbol là gì trong JavaScript?',
        explanation: 'Kiểu dữ liệu nguyên thủy tạo ra giá trị duy nhất.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'async function luôn trả về gì?',
        explanation: 'Trả về một Promise.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Phương thức nào dùng để kết hợp mảng?',
        explanation: '`concat()` kết hợp mảng mà không thay đổi mảng gốc.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Để ngăn chặn form reload sau submit dùng gì?',
        explanation: '`event.preventDefault()` trong sự kiện submit.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Cách khai báo biến toàn cục trong browser là gì?',
        explanation: 'Gán vào `window.tenBien`.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Tại sao nên dùng `===` thay vì `==`?',
        explanation: 'Để tránh các lỗi khi ép kiểu tự động không mong muốn.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'IIFE là gì?',
        explanation: 'Immediately Invoked Function Expression – hàm tự gọi ngay sau khi định nghĩa.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Phương thức `filter()` dùng làm gì?',
        explanation: 'Tạo mảng mới gồm các phần tử thỏa điều kiện.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Cách tạo object không có prototype?',
        explanation: 'Dùng `Object.create(null)`.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Câu nào là JSON hợp lệ?',
        explanation: 'Chuỗi phải dùng dấu ngoặc kép, không chứa hàm hoặc undefined.',
        createdAt: now,
        updatedAt: now
      },
      {
        quizID: 4,
        content: 'Sự kiện nào kích hoạt khi DOM tải xong?',
        explanation: '`DOMContentLoaded`.',
        createdAt: now,
        updatedAt: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quizzes_questions', {
      quizID: 4
    }, {});
  }
};
