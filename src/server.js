const express = require("express");
const bodyParser = require("body-parser");
const viewEngine = require("./config/viewEngine.js");
const initWebRoutes = require("./routes/web.js");
const connectDB = require("./config/connectDBNode.js");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

// ✅ CORS middleware CHUẨN
app.use(cors({
    origin: process.env.URL_REACT || "https://psi.plt.pro.vn",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));
app.use(cookieParser());
// ✅ Content-Type global
app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    next();
});

// ✅ Body parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// ✅ View & routes
viewEngine(app);
initWebRoutes(app);

// ✅ Connect DB
connectDB();

// ✅ Run server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
});
