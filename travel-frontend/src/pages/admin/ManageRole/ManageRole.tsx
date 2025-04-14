import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { createRole, updateRole, deleteRole } from "../../../services/roleService";
import { Role } from "../../../types/Role";
import useFetch from "../../../hooks/useFetch";

const RolePage: React.FC = () => {
    const token = localStorage.getItem("token");

    const { data: rolesData } = useFetch<Role[]>("/roles", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const [roles, setRoles] = useState<Role[]>([]);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [newRole, setNewRole] = useState({ name: "" });
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [updatedRole, setUpdatedRole] = useState({ name: "" });

    useEffect(() => {
        if (rolesData) {
            setRoles(rolesData);
        }
    }, [rolesData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedRole({ ...updatedRole, [e.target.name]: e.target.value });
    };

    const handleNewRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRole({ ...newRole, [e.target.name]: e.target.value });
    };

    const handleCreateRole = async () => {
        try {
            await createRole(newRole);
            setOpen(false);
            setNewRole({ name: "" });
            alert("Create role successfull")
        } catch (error) {
            console.error("Error creating role:", error);
        }
    };

    const handleEditRole = (role: Role) => {
        setSelectedRole(role);
        setUpdatedRole({ name: role.name });
        setOpenEdit(true);
    };

    const handleUpdateRole = async () => {
        if (!selectedRole) return;

        try {
            await updateRole(selectedRole._id, updatedRole);
            setOpenEdit(false);
            setSelectedRole(null);
            setUpdatedRole({ name: "" });
            alert("Update role successfull")
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    const handleDeleteRole = async (id: string) => {
        try {
            await deleteRole(id);
            alert("Delete role successfull")
        } catch (error) {
            console.error("Error deleting role:", error);
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Add Role
            </Button>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Role Name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow key={role._id}>
                                <TableCell>{role.name}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleEditRole(role)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDeleteRole(role._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Create Role Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create Role</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Role Name"
                        type="text"
                        fullWidth
                        value={newRole.name}
                        onChange={handleNewRoleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateRole} variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Role Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle>Edit Role</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Role Name"
                        type="text"
                        fullWidth
                        value={updatedRole.name}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button onClick={handleUpdateRole} variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RolePage;
