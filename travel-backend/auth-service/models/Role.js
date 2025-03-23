const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Role", RoleSchema);
