import React, { useState } from 'react';
import { Box, ListItemButton, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface NavItemProps {
    icon?: React.ReactNode;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    children?: Array<{ label: string; path: string; icon?: React.ReactNode }>;
    onChildClick?: (childPath: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, onClick, onChildClick, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleChildClick = (childPath: string) => {
        if (onChildClick) {
            onChildClick(childPath);
        }
        setIsOpen(false);
    };

    return (
        <Box>
            <ListItemButton
                onClick={children ? handleToggle : onClick}
                sx={(theme) => ({
                    borderRadius: theme.shape.borderRadius,
                })}
            >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={label} />
                {children && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {children && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {children.map((child, index) => (
                            <ListItemButton
                                key={index}
                                sx={(theme) => ({
                                    pl: theme.spacing(4),
                                    borderRadius: theme.shape.borderRadius,
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                })}
                                onClick={() => handleChildClick(child.path)}
                            >
                                {child.icon && <ListItemIcon>{child.icon}</ListItemIcon>}
                                <ListItemText primary={child.label} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            )}
        </Box>
    );
};

export default NavItem;
