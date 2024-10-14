import React from 'react';
import { Paper, Typography, Box, CircularProgress, Divider } from '@mui/material';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
});

const DeliveredStatCard2: React.FC = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '16px 24px',
        width: '352px',
        height: '100px',
        background: '#FFFFFF',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        justifyContent: 'space-between',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#666666',
          }}
        >
          Delivered
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '36px',
            color: '#1A1A1A',
          }}
        >
          18,033
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ height: '64px', alignSelf: 'center', backgroundColor: '#E0E0E0' }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', display: 'inline-flex', transform: 'rotate(0deg)' }}>
          <CircularProgress variant="determinate" value={80} size={52} thickness={4.5} sx={{ color: '#00C28B' }} />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: poppins.style.fontFamily,
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '24px',
              color: '#666666',
            }}
          >
            80%
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', marginTop: '8px', display: 'flex', gap: '4px' }}>
          <Typography sx={{ fontFamily: 'Source Sans Pro', fontWeight: 400, fontSize: '14px', color: '#666666' }}>
            Ontime:
          </Typography>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: '14px', color: '#0057D1' }}>
            1,23,456
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DeliveredStatCard2;
