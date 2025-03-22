const app = require("./app");
const connectDB = require("./config/database");
const { PORT } = require("./config/env");

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Destination Service is running on port ${PORT}`);
    });
};

startServer();