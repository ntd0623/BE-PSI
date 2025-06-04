require('dotenv').config();
module.exports = {

  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "timezone": "+07:00",
    "dialectOptions": {
      "charset": "utf8mb4",
      // Đôi khi thêm đây để ép chuẩn mã hóa
      "supportBigNumbers": true,
      "bigNumberStrings": true
    },
    "define": {
      "charset": "utf8mb4",
      "collate": "utf8mb4_unicode_ci"
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
