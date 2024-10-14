import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
});

const StatusStatCard2: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: '100px',
        width: '592px',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1.2,
          backgroundColor: '#FFEEEE',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '12px 24px',
        }}
      >
        <Typography
          variant="subtitle1"
          color="error"
          sx={{ fontFamily: poppins.style.fontFamily, fontWeight: '600', fontSize: '16px', lineHeight: '24px' }}
        >
          Delayed
        </Typography>
        <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 'bold', fontSize: '24px', lineHeight: '36px' }}>
          18,033
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ borderColor: '#E0E0E0' }} />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '12px 24px' }}>
        <Typography variant="subtitle1" color="textSecondary" sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600 }}>
          In transit
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 'bold', fontSize: '24px' }}>18,033</Typography>
          <Typography
            sx={{ backgroundColor: '#D7E3FE', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px', fontSize: '12px', fontWeight: 500 }}
          >
            72%
          </Typography>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ borderColor: '#E0E0E0' }} />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '12px 24px' }}>
        <Typography variant="subtitle1" color="textSecondary" sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600 }}>
          Delivered
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 'bold', fontSize: '24px' }}>18,033</Typography>
          <Typography sx={{ backgroundColor: '#D7E3FE', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px', fontSize: '12px', fontWeight: 500 }}>
            72%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default StatusStatCard2;
