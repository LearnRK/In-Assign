import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
});

interface TotalTripsStatCardProps {
  title: string;
  value: string | number;
}

const TotalTripsStatCard2: React.FC<TotalTripsStatCardProps> = ({ title, value }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '16px 24px',
        width: '240px',
        height: '100px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#666666',
          }}
        >
          {title}
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
          {value.toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TotalTripsStatCard2;
