import React from 'react';
import { Paper, Typography, Box, CircularProgress, Divider } from '@mui/material';
import { Poppins } from '@next/font/google';

// Import Poppins font
const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
});

const DeliveredStatCard: React.FC = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '12px',
        border: '1px solid #e0e0e0',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
        height: '100px',
        width: '100%',
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{
            fontFamily: poppins.style.fontFamily, // Applying Poppins font
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '24px',
            marginBottom: '4px', // Adjust for spacing below the text
          }}
        >
          Delivered
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', fontSize: '28px', lineHeight: 1, fontFamily: poppins.style.fontFamily }}
        >
          18,033
        </Typography>
      </Box>

      {/* Divider */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          height: '60px', // Adjusted to match the box height
          marginLeft: 'auto',
          marginRight: '24px',
        }}
      />

      {/* Right Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={72}
            size={50}
            thickness={4.5}
            sx={{ color: '#00e676' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#424242',
            }}
          >
            72%
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', marginTop: '8px' }}>
          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '12px', lineHeight: '1.2' }}>
            Ontime:
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            sx={{ ml: 0.5, fontSize: '12px', fontWeight: 'bold' }}
          >
            1,23,456
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DeliveredStatCard;
