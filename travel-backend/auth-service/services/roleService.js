const roleRepository = require("../repositories/roleRepository");

exports.createRole = async (name) => {
    const existingRole = await roleRepository.findByName(name);
    if (existingRole) {
        throw new Error("Role already exists");
    }
    return await roleRepository.createRole({ name });
};

exports.getAllRoles = async () => {
    return await roleRepository.getAllRoles();
};

exports.getRoleById = async (roleId) => {
    const role = await roleRepository.findById(roleId);
    if (!role) throw new Error("Role not found");
    return role;
};

exports.updateRole = async (roleId, updateData) => {
    const updatedRole = await roleRepository.updateRole(roleId, updateData);
    if (!updatedRole) throw new Error("Role not found or already deleted");
    return updatedRole;
};

exports.deleteRole = async (roleId) => {
    const deletedRole = await roleRepository.deleteRole(roleId);
    if (!deletedRole) throw new Error("Role not found");
    return deletedRole;
};