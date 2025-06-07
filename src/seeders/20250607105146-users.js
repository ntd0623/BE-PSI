'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        email: 'user1@example.com',
        password: 'hashedpassword1',
        fullName: 'Ngô Thanh Đô',
        roleID: 'R2',
        genderID: 'M',
        studentID: '23211tt4519',
        school_name: 'Cao Đẳng Công Nghệ Thủ Đức',
        major: 'Công Nghệ Thông Tin',
        year: 2023,
        gpa: 3.50,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user2@example.com',
        password: 'hashedpassword2',
        fullName: 'Lê Thị Hoa',
        roleID: 'R2',
        genderID: 'F',
        studentID: '23211tt4520',
        school_name: 'Đại Học Bách Khoa',
        major: 'Kỹ Thuật Phần Mềm',
        year: 2022,
        gpa: 3.80,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user3@example.com',
        password: 'hashedpassword3',
        fullName: 'Trần Văn Nam',
        roleID: 'R2',
        genderID: 'M',
        studentID: '23211tt4521',
        school_name: 'Đại Học Công Nghệ',
        major: 'Mạng Máy Tính',
        year: 2024,
        gpa: 3.20,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user4@example.com',
        password: 'hashedpassword4',
        fullName: 'Phạm Thị Mai',
        roleID: 'R2',
        genderID: 'F',
        studentID: '23211tt4522',
        school_name: 'Cao Đẳng Công Nghệ Thủ Đức',
        major: 'An Toàn Thông Tin',
        year: 2023,
        gpa: 3.70,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin@example.com',
        password: 'hashedpasswordAdmin',
        fullName: 'Quản Trị Viên',
        roleID: 'R1',
        genderID: 'O',
        studentID: null,
        school_name: null,
        major: null,
        year: null,
        gpa: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
