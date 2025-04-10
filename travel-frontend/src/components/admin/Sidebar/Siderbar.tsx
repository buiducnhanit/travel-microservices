import React, { useEffect, useState } from 'react';
import { Box, Drawer, List, Divider, Typography } from '@mui/material';
import { Home, Person, Storefront, ShoppingCart, BarChart, Shield } from '@mui/icons-material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import NavItem from './NavItem';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const menuItems = [
    {
        title: 'Management',
        items: [
            { label: 'Dashboard', icon: <Home />, path: '/dashboard' },
            {
                label: 'Tours',
                icon: <Storefront />,
                children: [
                    { label: 'Tour List', icon: <Icon icon="mdi:format-list-bulleted" />, path: '/dashboard/tours' },
                    { label: 'Add Tour', icon: <Icon icon="mdi:plus-box" />, path: '/dashboard/tours/create' },
                ],
            },
            {
                label: 'Destinations',
                icon: <Icon icon="mdi:map-marker" />,
                children: [
                    { label: 'Destination List', icon: <Icon icon="mdi:format-list-bulleted" />, path: '/dashboard/destinations' },
                    { label: 'Add Destination', icon: <Icon icon="mdi:plus-box" />, path: '/dashboard/destinations/create' },
                ],
            },
            { label: 'Bookings', icon: <ShoppingCart />, path: '/dashboard/bookings' },
            { label: 'Customers', icon: <Person />, path: '/dashboard/customers' },
            { label: 'Roles', icon: <Shield />, path: '/dashboard/roles' },
        ],
    },
    {
        title: 'Utilities',
        items: [
            { label: 'Support Chat', icon: <Icon icon="mdi:message-bubble" />, path: '/dashboard/chat' },
            { label: 'Mailbox', icon: <Icon icon="ic:outline-email" />, path: '/dashboard/email' },
            {
                label: 'Reports',
                icon: <BarChart />,
                children: [
                    { label: 'Revenue', icon: <Icon icon="mdi:sale" />, path: '/dashboard/reports/revenue' },
                    { label: 'Traffic', icon: <Icon icon="mdi:chart-line" />, path: '/dashboard/reports/traffic' },
                ],
            },
        ],
    },
];

const Sidebar: React.FC<SidebarProps> = ({ open }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState<string>(() => {
        const currentPath = location.pathname;
        const matchedItem = menuItems
            .flatMap((category) => category.items)
            .find((item) => item.path === currentPath || item.children?.some((child) => child.path === currentPath));

        return matchedItem?.label || 'Dashboard';
    });
    
    const handleNavItemClick = (item: string, path: string) => {
        setActiveItem(item);
        navigate(path);
    };
    
    useEffect(() => {
        const currentPath = location.pathname;
        const matchedItem = menuItems
            .flatMap((category) => category.items)
            .find((item) => item.path === currentPath || item.children?.some((child) => child.path === currentPath));
    
        if (matchedItem) {
            setActiveItem(matchedItem.label);
        }
    }, [location.pathname]);
    
    return (
        <Drawer
            sx={{
                width: 300,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 300,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Logo hoặc tiêu đề */}
                <Typography variant="h4" align="center" sx={{ margin: '10px', padding: 2, fontWeight: 700 }}>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Travelo
                    </Link>
                </Typography>

                {menuItems.map((category, index) => (
                    <Box key={index}>
                        <Divider />
                        <Typography variant="overline" sx={{ padding: 2 }}>
                            {category.title}
                        </Typography>
                        <List>
                            {category.items.map((item, idx) => (
                                <NavItem
                                    key={idx}
                                    icon={item.icon}
                                    label={item.label}
                                    isActive={activeItem === item.label}
                                    onClick={
                                        item.children
                                            ? undefined
                                            : () => handleNavItemClick(item.label, item.path!)
                                    }
                                    children={item.children}
                                    onChildClick={(childPath) => handleNavItemClick(item.label, childPath)}
                                />
                            ))}
                        </List>
                    </Box>
                ))}
            </Box>
        </Drawer>
    );
};

export default Sidebar;
