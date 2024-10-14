import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Image from 'next/image'; // Assuming you're using Next.js Image component for the logo
import Logout from '../auth/Logout';

const Header: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Image
                        src="/logo.svg" // Correct path to the logo located in the public directory
                        alt="logoipsum"
                        width={120} // Adjust the size as needed
                        height={40}
                    />
                </Box>
                <Logout />
                {/* <Button variant="contained" sx={{ backgroundColor: '#fff', color: '#000', textTransform: 'none' }}>
                    Action
                </Button> */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
