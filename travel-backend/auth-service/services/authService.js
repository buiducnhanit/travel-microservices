const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/authRepository");
const roleRepository = require("../repositories/roleRepository");

exports.register = async (username, email, password, roleName) => {
    const role = await roleRepository.findByName(roleName) || await roleRepository.findByName("User");
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
        username,
        email,
        password: hashedPassword,
        role: role._id,
        isDeleted: false
    };

    return await userRepository.createUser(userData);
};

exports.login = async (email, password) => {
    const user = await userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { id: user._id, role: user.role.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { token, role: user.role.name };
};

exports.getUserFromToken = async (token) => {
    if (!token) throw new Error("Access Denied");

    const pureToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(pureToken, process.env.JWT_SECRET);
    const user = await userRepository.findById(decoded.id);

    if (!user) throw new Error("User not found");

    return user;
};

exports.getAllUsers = async () => {
    return await userRepository.getAllUsers();
};

exports.getUserById = async (userId) => {
    return await userRepository.findById(userId)
};

exports.updateUser = async (id, updateData) => {
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await userRepository.updateUser(id, updateData);
};

exports.deleteUser = async (id) => {
    return await userRepository.deleteUser(id);
};

exports.updateUserProfileImage = async (userId, imageUrl) => {
    const updatedUser = await userRepository.updateProfileImage(userId, imageUrl);
    if (!updatedUser) {
        throw new Error("Failed to update profile image");
    }
    return updatedUser;
}

exports.forgotPassword = async (email) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Giả sử gửi email (cần tích hợp Nodemailer hoặc một dịch vụ email)
    console.log(`Password reset link: http://localhost:3000/reset-password?token=${resetToken}`);

    return resetToken;
};

exports.changePassword = async (id, oldPassword, newPassword) => {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error("Old password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
};