'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10);

    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', salt),
        roleID: 'R1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'thanhdo062305@gmail.com',
        password: bcrypt.hashSync('123456', salt),
        roleID: 'R2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@example.com',
        password: bcrypt.hashSync('123456', salt),
        roleID: 'R2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user3@example.com',
        password: bcrypt.hashSync('123456', salt),
        roleID: 'R2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user4@example.com',
        password: bcrypt.hashSync('123456', salt),
        roleID: 'R2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user5@example.com',
        password: bcrypt.hashSync('123456', salt),
        roleID: 'R2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
