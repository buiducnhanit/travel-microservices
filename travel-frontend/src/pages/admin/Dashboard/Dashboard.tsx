import React from "react";
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Storefront, ShoppingCart, AttachMoney, People } from "@mui/icons-material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
    const stats = [
        { label: "Total Tours", value: 120, icon: <Storefront fontSize="large" color="primary" /> },
        { label: "Total Bookings", value: 450, icon: <ShoppingCart fontSize="large" color="secondary" /> },
        { label: "Revenue", value: "$35,000", icon: <AttachMoney fontSize="large" color="success" /> },
        { label: "Total Customers", value: 980, icon: <People fontSize="large" color="warning" /> },
    ];

    const bookings = [
        { id: 1, customer: "John Doe", tour: "Bali Adventure", date: "2025-03-25", status: "Confirmed" },
        { id: 2, customer: "Jane Smith", tour: "Paris Getaway", date: "2025-03-20", status: "Pending" },
        { id: 3, customer: "Michael Lee", tour: "Tokyo Discovery", date: "2025-03-22", status: "Cancelled" },
    ];

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                label: "Revenue ($)",
                data: [5000, 7200, 8600, 9400, 10200],
                borderColor: "#3f51b5",
                backgroundColor: "rgba(63, 81, 181, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
            },
        },
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            {/* Statistics Cards */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {stats.map((stat, index) => (
                    <Card key={index} sx={{ flex: "1 1 250px", display: "flex", alignItems: "center", padding: 2 }}>
                        <Box sx={{ marginRight: 2 }}>{stat.icon}</Box>
                        <CardContent>
                            <Typography variant="h6">{stat.label}</Typography>
                            <Typography variant="h5" fontWeight="bold">
                                {stat.value}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Sales Chart */}
            <Box sx={{ marginTop: 5, height: 300 }}>
                <Typography variant="h6" gutterBottom>
                    Revenue Growth
                </Typography>
                <Line data={salesData} options={chartOptions} />
            </Box>

            {/* Recent Bookings Table */}
            <Box sx={{ marginTop: 5 }}>
                <Typography variant="h6" gutterBottom>
                    Recent Bookings
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer</TableCell>
                                <TableCell>Tour</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.customer}</TableCell>
                                    <TableCell>{booking.tour}</TableCell>
                                    <TableCell>{booking.date}</TableCell>
                                    <TableCell>{booking.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Dashboard;
