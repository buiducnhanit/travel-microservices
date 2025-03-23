const app = require("./app");
const connectDB = require("./config/db");
const createDefaultAdmin = require("./config/initUserAdmin");
const { PORT } = require("./config/env");

const startServer = async () => {
    await connectDB();
    await createDefaultAdmin();
    console.log("Kiểm tra & tạo Admin mặc định hoàn tất!");

    app.listen(PORT, () => {
        console.log(`Auth Service is running on port ${PORT}`);
    });
};

startServer();