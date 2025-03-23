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

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role ? user.role.name : "No Role",
        });
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

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await authService.updateUser(req.params.id, req.body);
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
