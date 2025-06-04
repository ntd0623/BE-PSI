# 🎓 PSI System - Hệ thống quản lý sinh viên thực tập (Backend)

Đây là **RESTful API backend** cho hệ thống quản lý sinh viên thực tập, được xây dựng bằng **Node.js**, **Express**, và **Sequelize (MySQL)**.

---

## 🚀 Công nghệ sử dụng

- 🔧 **Node.js** + **Express** – Framework backend chính
- 🗄️ **Sequelize ORM** + **MySQL** – Giao tiếp với cơ sở dữ liệu
- 🔐 **dotenv** – Quản lý biến môi trường
- 🌐 **CORS**, **body-parser** – Middleware cho API
- ⚙️ **Babel** – Hỗ trợ cú pháp ES6+ (import/export)

---

## 📁 Cấu trúc thư mục

├── src/
│ ├── config/ # Cấu hình DB & view engine
│ ├── controllers/ # Logic xử lý các API
│ ├── models/ # Sequelize models
│ ├── route/ # Định tuyến API
│ ├── services/ # Business logic
│ └── server.js # Điểm khởi động server
├── .env # Biến môi trường (KHÔNG push lên Git)
├── .gitignore
├── package.json
└── README.md

---

## ⚙️ Cài đặt

### 1. Clone project

```bash
git clone https://github.com/ntd0623/BE-PSI.git
cd backend-psi
```

### 2. Cài đặt package

```bash
npm install
```

### 3. Tạo ENV

```bash
    cp .env
    PORT=8080
    - URL_REACT=http://localhost:3000

    - DB_HOST=127.0.0.1
    - DB_PORT=3306
    - DB_USER=root
    - DB_PASSWORD=your_password
    - DB_NAME=movie_booking_db
```

### 4. Chạy development

```bash
    npm start
    Server sẽ chạy tại: http://localhost:8080
```

### 5. Chạy migration

```bash
    npx sequelize-cli db:migrate
```

### 6. Chạy seeder

```bash

    npx sequelize-cli db:seed:all
```

## 📌 Ghi chú

💡 **Lưu ý quan trọng khi chạy dự án:**

- 🛢️ **MySQL**: Đảm bảo **MySQL server đang được khởi động** và cấu hình kết nối đúng trong file `.env`.
- 📬 **API testing**: Bạn nên sử dụng **[Postman](https://www.postman.com/)** hoặc công cụ tương tự để kiểm thử các endpoint.
- 🖥️ **Frontend tích hợp**: Ứng dụng frontend sử dụng **ReactJS**, giao tiếp với backend thông qua biến môi trường `URL_REACT`.

> ⚠️ Nếu backend không kết nối được với DB hoặc frontend không nhận được phản hồi, hãy kiểm tra lại:
>
> - File `.env`
> - Cổng kết nối MySQL (`3306`)
> - Cấu hình CORS trong server

---
