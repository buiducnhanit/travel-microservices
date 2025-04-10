import React, { useState } from 'react';
import Topbar from '../components/admin/Topbar/Topbar';
import Sidebar from '../components/admin/Sidebar/Siderbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/admin/Footer';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

const AdminLayout: React.FC = () => {
    const drawerWidth = 300;
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Box display="flex" minHeight="100vh">
                {/* Sidebar */}
                <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />

                {/* Topbar */}
                <Topbar
                    onToggleSidebar={handleSidebarToggle}
                    sx={{
                        marginLeft: sidebarOpen ? `${drawerWidth}px` : 0,
                        transition: 'margin-left 0.3s ease',
                        width: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)`,
                    }}
                />

                {/* Main content */}
                <Box
                    component="main"
                    sx={{
                        bgcolor: grey[100],
                        flexGrow: 1,
                        padding: 3,
                        marginTop: 12,
                        marginLeft: sidebarOpen ? 0 : `-${drawerWidth}px`,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>

            {/* Footer */}
            <Footer
                sx={{
                    marginLeft: sidebarOpen ? `${drawerWidth}px` : 0,
                    transition: 'margin-left 0.3s ease',
                    width: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)`,
                }}
            />
        </>
    );
};

export default AdminLayout;
