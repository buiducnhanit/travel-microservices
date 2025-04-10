import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { Tour } from "../../../types/Tour";
import DataTable from "../../../components/admin/DataTable";
import { deleteTour } from "../../../services/tourService";
import { useNavigate } from "react-router-dom";

const ManageTours: React.FC = () => {
    const { data: toursData } = useFetch<Tour[]>("/tours");
    const [tours, setTours] = useState<Tour[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        if (toursData) {
            setTours(toursData);
        }
    }, [toursData]);

    // Lọc dữ liệu theo tìm kiếm
    const filteredTours = tours.filter((tour) =>
        tour.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleCreateTour = () => {
        navigate(`/dashboard/tours/add`);
    };

    // Cập nhật tour
    const handleEditTour = (tour: Tour) => {
        navigate(`/dashboard/tours/edit/${tour._id}`);
    };

    // Xóa tour
    const handleDeleteTour = async (tourId: string) => {
        try {
            await deleteTour(tourId);
            setTours((prev) => prev.filter((t) => t._id !== tourId));
            alert("Delete tour successfully");
        } catch (error) {
            console.error("Error deleting tour:", error);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Tour List</Typography>

            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                <TextField
                    label="Search Tour"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleCreateTour}>
                    Add Tour
                </Button>
            </Box>

            <DataTable
                data={filteredTours}
                columns={[
                    {
                        label: "Image",
                        render: (tour) =>
                            tour.images.length > 0 ? <Avatar src={tour.images[0].imageUrl} alt={tour.name} /> : null
                    },
                    { label: "Name", key: "name" },
                    { label: "Description", key: "description" },
                    { label: "Price ($)", key: "price" },
                    { label: "Duration (Days)", key: "duration" },
                    { label: "Available Slots", key: "availableSlots" },
                    {
                        label: "Actions",
                        render: (tour) => (
                            <div style={{ display: "flex", gap: "8px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleEditTour(tour)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={() => handleDeleteTour(tour._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ),
                    },
                ]}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />
        </Box>
    );
};

export default ManageTours;
