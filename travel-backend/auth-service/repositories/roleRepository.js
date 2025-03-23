const Role = require("../models/Role");

exports.getAllRoles = async () => {
    return await Role.find({ isDeleted: false });
};

exports.findById = async (roleId) => {
    return await Role.findOne({ _id: roleId, isDeleted: false });
}

exports.findByName = async (roleName) => {
    return await Role.findOne({ name: roleName, isDeleted: false });
};

exports.createRole = async (roleData) => {
    const role = new Role(roleData);
    return await role.save();
};

exports.updateRole = async (roleId, updateData) => {
    return await Role.findOneAndUpdate(
        { _id: roleId, isDeleted: false },
        { $set: updateData },
        { new: true }
    );
};

exports.deleteRole = async (roleId) => {
    return await Role.findOneAndUpdate(
        { _id: roleId },
        { $set: { isDeleted: true } },
        { new: true }
    );
};