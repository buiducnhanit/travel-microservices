const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    phone: { type: String },  
    password: { type: String, required: true },
    avatar: { type: String }, 
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserSchema);
