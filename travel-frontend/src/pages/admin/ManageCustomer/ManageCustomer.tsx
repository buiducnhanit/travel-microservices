import { useEffect, useState } from "react";
import DataTable from "../../../components/admin/DataTable";
import { Customer } from "../../../types/Customer";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { deleteCustomer, updateCustomer } from "../../../services/customerService";

const ManageCustomer = () => {
    const token = localStorage.getItem("token");
    const { data: customersData } = useFetch<Customer[]>("/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [updatedCustomer, setUpdatedCustomer] = useState<Partial<Customer>>({});

    useEffect(() => {
        if (customersData) {
            setCustomers(customersData);
        }
    }, [customersData]);

    // Mở modal chỉnh sửa
    const handleEditCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
        setUpdatedCustomer(customer);
        setOpenEditModal(true);
    };

    // Đóng modal
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedCustomer(null);
    };

    // Cập nhật giá trị nhập vào
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedCustomer({ ...updatedCustomer, [e.target.name]: e.target.value });
    };

    // Cập nhật khách hàng
    const handleUpdateCustomer = async () => {
        if (selectedCustomer) {
            try {
                await updateCustomer(selectedCustomer._id, updatedCustomer);
                alert("Cập nhật khách hàng thành công!");
                setCustomers((prev) =>
                    prev.map((c) => (c._id === selectedCustomer._id ? { ...c, ...updatedCustomer } : c))
                );
                handleCloseEditModal();
            } catch {
                alert("Cập nhật thất bại!");
            }
        }
    };

    // Xóa khách hàng
    const handleDeleteCustomer = async (customer: Customer) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa khách hàng ${customer.username}?`)) {
            try {
                await deleteCustomer(customer._id);
                alert("Xóa khách hàng thành công!");
                setCustomers((prev) => prev.filter((c) => c._id !== customer._id));
            } catch {
                alert("Xóa khách hàng thất bại!");
            }
        }
    };

    // Cấu hình cột
    const columns = [
        { label: "Username", key: "username" as keyof Customer },
        { label: "Tên khách hàng", key: "fullname" as keyof Customer },
        { label: "Email", key: "email" as keyof Customer },
        { label: "Địa chỉ", key: "address" as keyof Customer },
        { label: "Điện thoại", key: "phone" as keyof Customer },
        {
            label: "Actions",
            render: (customer: Customer) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleEditCustomer(customer)}>
                        Edit
                    </Button>
                    <Button variant="contained" color="secondary" size="small" onClick={() => handleDeleteCustomer(customer)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Customers</h2>

            <DataTable
                data={customers}
                columns={columns}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
            />

            {/* Modal chỉnh sửa khách hàng */}
            <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                <DialogTitle>Chỉnh sửa khách hàng</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Username"
                        name="username"
                        value={updatedCustomer.username || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Tên khách hàng"
                        name="fullname"
                        value={updatedCustomer.fullname || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        value={updatedCustomer.email || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Địa chỉ"
                        name="address"
                        value={updatedCustomer.address || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Điện thoại"
                        name="phone"
                        value={updatedCustomer.phone || ""}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal}>Hủy</Button>
                    <Button onClick={handleUpdateCustomer} variant="contained" color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageCustomer;
