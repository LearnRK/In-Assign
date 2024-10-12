// Header.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Image from 'next/image'; // Assuming you're using Next.js Image component for the logo

const Header: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Image
                        src="/path_to_logo.png" // Replace with your logo path
                        alt="logoipsum"
                        width={40} // Adjust the size as needed
                        height={40}
                    />
                    <Typography variant="h6" sx={{ marginLeft: 1, color: '#fff' }}>
                        LogoIpsum
                    </Typography>
                </Box>
                <Button variant="contained" sx={{ backgroundColor: '#fff', color: '#000', textTransform: 'none' }}>
                    Action
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
