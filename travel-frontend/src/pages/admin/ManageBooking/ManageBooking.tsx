/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Button, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import DataTable from "../../../components/admin/DataTable";
import { Booking } from "../../../types/Booking";
import { updateBooking, deleteBooking } from "../../../services/bookingService";
import useFetch from "../../../hooks/useFetch";

interface Column<T> {
    label: string;
    key?: keyof T;
    render?: (item: T) => React.ReactNode;
}

const ManageBooking = () => {
    const { data: bookingsData } = useFetch<Booking[]>("/bookings");
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [updatedBooking, setUpdatedBooking] = useState<Partial<Booking>>({});

    useEffect(() => {
        if (bookingsData) {
            setBookings(bookingsData);
        }
    }, [bookingsData]);

    console.log(bookings)
    // Xử lý thay đổi trang
    const handlePageChange = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Xử lý thay đổi số hàng trên mỗi trang
    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Cập nhật trạng thái booking
    const handleUpdateStatus = async (booking: Booking, newStatus: string) => {
        try {
            const updatedBooking = { ...booking, status: newStatus };
            await updateBooking(updatedBooking);

            setBookings((prevBookings) =>
                prevBookings.map((b) =>
                    b._id === booking._id ? { ...b, status: newStatus } : b
                )
            );

            alert("Cập nhật trạng thái booking thành công!");
        } catch (error) {
            alert("Cập nhật trạng thái thất bại!");
        }
    };

    // Xóa booking
    const handleDeleteBooking = async (booking: Booking) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa booking này?")) {
            try {
                await deleteBooking(booking._id);
                alert("Xóa booking thành công!");

                setBookings((prevBookings) => prevBookings.filter(b => b._id !== booking._id));
            } catch (error) {
                alert("Xóa booking thất bại!");
            }
        }
    };

    // Mở modal chỉnh sửa booking
    const handleEditBooking = (booking: Booking) => {
        setSelectedBooking(booking);
        setUpdatedBooking(booking);
        setOpenEditModal(true);
    };

    // Đóng modal chỉnh sửa booking
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedBooking(null);
    };

    // Cập nhật thông tin booking
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedBooking({ ...updatedBooking, [e.target.name]: e.target.value });
    };

    // Lưu cập nhật booking
    const handleSaveUpdateBooking = async () => {
        if (selectedBooking) {
            try {
                const updated = await updateBooking({ ...selectedBooking, ...updatedBooking });
                alert("Cập nhật booking thành công!");
                setBookings((prevBookings) =>
                    prevBookings.map((b) => (b._id === updated._id ? updated : b))
                );
                setOpenEditModal(false);
            } catch (error) {
                alert("Cập nhật booking thất bại!");
            }
        }
    };

    // Cấu hình cột hiển thị
    const columns: Column<Booking>[] = [
        { label: "Khách hàng", render: (booking) => booking.fullName ?? "N/A" },
        { label: "Tour", render: (booking) => booking.tourDetails?.name ?? "N/A" },
        { label: "Email", render: (booking) => booking.email ?? "N/A" },
        { label: "SDT", render: (booking) => booking.phone ?? "N/A" },
        { label: "Số người", render: (booking) => booking.people ?? "N/A" },
        { label: "Ngày đặt", render: (booking) => new Date(booking.createdAt).toLocaleDateString() },
        {
            label: "Trạng thái",
            render: (booking) => (
                <Select
                    key={booking._id}
                    value={booking.status}
                    onChange={(e) => handleUpdateStatus(booking, e.target.value)}
                    size="small"
                >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Confirmed">Confirmed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
            ),
        },
        {
            label: "Actions",
            render: (booking) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEditBooking(booking)}
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDeleteBooking(booking)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quản lý Booking</h2>

            <DataTable
                data={bookings}
                columns={columns}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />

            {/* Modal chỉnh sửa booking */}
            <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                <DialogTitle>Chỉnh sửa Booking</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Họ và tên"
                        name="fullName"
                        value={updatedBooking.fullName || ""}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        value={updatedBooking.email || ""}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Số điện thoại"
                        name="phone"
                        value={updatedBooking.phone || ""}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Số người"
                        name="people"
                        type="number"
                        value={updatedBooking.people || ""}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleSaveUpdateBooking} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageBooking;
