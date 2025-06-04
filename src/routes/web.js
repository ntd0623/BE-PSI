const initWebRoutes = (app) => {
    app.get("/", (req, res) => {
        res.send("Backend PSI đã chạy!");
    });
};

export default initWebRoutes;