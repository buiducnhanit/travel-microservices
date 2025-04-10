/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Footer: React.FC<{ sx?: any }> = ({ sx }) => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                height: "60px",
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...sx,
            }}
        >
            <Typography variant="body2" color="inherit">
                &copy; 2024 E-Commerce: Bui Duc Nhan. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
