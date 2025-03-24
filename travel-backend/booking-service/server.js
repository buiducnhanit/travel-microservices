const app = require("./app");
const connectDB = require("./config/db");
const { PORT } = require("./config/env");

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Booking Service is running on port ${PORT}`);
    });
};

startServer();