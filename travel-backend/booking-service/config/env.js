const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    API_GATEWAY_URL: process.env.API_GATEWAY_URL,
};
