/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBar, Toolbar, IconButton, Stack, TextField, InputAdornment, Box } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Login, Logout } from '@mui/icons-material';

const Topbar: React.FC<{ onToggleSidebar: () => void, sx?: any }> = ({ onToggleSidebar, sx }) => {

    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = () => {
        console.log('Tìm kiếm: ', searchQuery);
    };

    return (
        <AppBar
            position="fixed"
            sx={(theme) => ({
                paddingBottom: 1,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                ...sx,
            })}
        >
            <Toolbar
                component={Stack}
                direction={'row'}
                alignItems="center"
                justifyContent="space-between"
                padding={2}
            >
                {/* Menu Button - Để mở Sidebar */}
                <IconButton
                    edge="start"
                    aria-label="menu"
                    onClick={onToggleSidebar}
                >
                    <MenuIcon />
                </IconButton>

                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchSubmit();
                        }
                    }}
                    sx={{
                        width: 500,
                        borderRadius: '50px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '50px',
                            '& fieldset': {
                                borderColor: (theme) => theme.palette.primary.main,
                            },
                            '&:hover fieldset': {
                                borderColor: (theme) => theme.palette.primary.light,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: (theme) => theme.palette.primary.dark,
                            },
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={handleSearchSubmit}>
                                        <Icon icon="mdi:magnify" width="24" height="24" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                {/* Các nút khác có thể thêm vào, như thông báo */}
                <Box sx={{ display: 'flex', justifyItems: 'center', gap: 4 }}>
                    <Logout/>
                    <Login/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
