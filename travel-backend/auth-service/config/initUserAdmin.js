const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Role = require("../models/Role");

async function createDefaultAdmin() {
    try {
        let adminRole = await Role.findOne({ name: "Admin" });
        if (!adminRole) {
            adminRole = await Role.create({ name: "Admin" });
            console.log("Role Admin đã được tạo.");
        }

        let adminUser = await User.findOne({ email: "admin@gmail.com" });
        if (!adminUser) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            adminUser = await User.create({
                username: "Admin",
                email: "admin@gmail.com",
                password: hashedPassword,
                role: adminRole._id,
            });
            console.log("Admin User mặc định đã được tạo.");
        }
    } catch (error) {
        console.error("Lỗi khi tạo Admin mặc định:", error);
    }
}

module.exports = createDefaultAdmin;
