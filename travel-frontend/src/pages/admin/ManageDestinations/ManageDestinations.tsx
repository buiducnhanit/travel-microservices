import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Destination } from "../../../types/Destination";
import DataTable from "../../../components/admin/DataTable";
import { deleteDestination } from "../../../services/destinationService";

const ManageDestinations: React.FC = () => {
    const { data: destinationsData } = useFetch<Destination[]>("/destinations");
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        if (destinationsData) {
            setDestinations(destinationsData);
        }
    }, [destinationsData]);

    // Lọc danh sách điểm đến theo tìm kiếm
    const filteredDestinations = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(search.toLowerCase())
    );

    // Chỉnh sửa điểm đến
    const handleEditDestination = (destination: Destination) => {
        navigate(`/dashboard/destinations/edit/${destination._id}`);
    };

    // Xóa điểm đến
    const handleDeleteDestination = async (destinationId: string) => {
        try {
            await deleteDestination(destinationId);
            setDestinations((prev) => prev.filter((d) => d._id !== destinationId));
            alert("Delete destination successfully");
        } catch (error) {
            console.error("Error deleting destination:", error);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Destination List</Typography>

            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                <TextField
                    label="Search Destination"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={() => navigate("/admin/destinations/create")}>
                    Add Destination
                </Button>
            </Box>

            <DataTable
                data={filteredDestinations}
                columns={[
                    {
                        label: "Image",
                        render: (destination) =>
                            destination.images.length > 0 ? <Avatar src={destination.images[0].imageUrl} alt={destination.name} /> : null
                    },
                    { label: "Name", key: "name" },
                    { label: "Description", key: "description" },
                    {
                        label: "Country",
                        render: (destination) => destination.location?.country || "N/A",
                    },
                    {
                        label: "City",
                        render: (destination) => destination.location?.city || "N/A",
                    },
                    {
                        label: "Actions",
                        render: (destination) => (
                            <div style={{ display: "flex", gap: "8px" }}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="small" 
                                    onClick={() => handleEditDestination(destination)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    size="small" 
                                    onClick={() => handleDeleteDestination(destination._id)}
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

export default ManageDestinations;
