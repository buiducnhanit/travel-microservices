const User = require("../models/User");

exports.findByEmail = async (email) => {
    return await User.findOne({ email, isDeleted: false }).populate("role");
};

exports.findById = async (id) => {
    return await User.findById({ _id: id, isDeleted: false }).populate("role", "name");
};

exports.getAllUsers = async () => {
    return await User.find({ isDeleted: false }).populate("role", "name");
};

exports.createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

exports.updateUser = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteUser = async (id) => {
    return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};