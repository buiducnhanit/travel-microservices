const mongoose = require("mongoose");
const { MONGO_URL } = require("./env");

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
            .then(() => console.log("Tour Service: MongoDB Connected"))
            .catch(err => console.log("MongoDB Connection Error:", err));
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
