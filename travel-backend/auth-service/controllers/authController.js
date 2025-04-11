const authService = require("../services/authService");

exports.register = async (req, res) => {
    try {
        const { username, email, password, roleName } = req.body;
        await authService.register(username, email, password, roleName);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await authService.getUserFromToken(req.header("Authorization"));
        if (!user) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        res.json({ user });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await authService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await authService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await authService.updateUser(req.params.id, req.body);
        const updatedUser = await authService.getUserById(user._id);
        res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await authService.deleteUser(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateProfileImage = async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const imageUrl = req.file.path;

        const updatedUser = await userService.updateUserProfileImage(id, imageUrl);

        return res.status(200).json({
            message: "Profile image updated successfully",
            profileImage: updatedUser.profileImage,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await authService.forgotPassword(email);
        res.json({ message: "Password reset link sent to email" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { id, oldPassword, newPassword } = req.body;
        await authService.changePassword(id, oldPassword, newPassword);
        res.json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};