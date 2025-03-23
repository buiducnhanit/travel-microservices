const roleService = require("../services/roleService");

exports.createRole = async (req, res) => {
    try {
        const role = await roleService.createRole(req.body.name);
        res.status(201).json({ message: "Role created successfully", role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await roleService.getRoleById(req.params.id);
        res.json(role);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.updateRole = async (req, res) => {
    console.log(req.body)
    try {
        const updatedRole = await roleService.updateRole(req.params.id, req.body);
        res.json({ message: "Role updated successfully", updatedRole });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        await roleService.deleteRole(req.params.id);
        res.json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};