import React from 'react';
import { Box, CircularProgress, Divider, Paper, Typography } from '@mui/material';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
});

interface Trip {
  id: string;
  tripId: string;
  transporter: string;
  tripStartTime: string;
  currentStatusCode: string;
  currenStatus: string;
  phoneNumber: string;
  etaDays: number;
  distanceRemaining: number;
  tripEndTime: string;
  source: string;
  sourceLatitude: number;
  sourceLongitude: number;
  dest: string;
  destLatitude: number;
  destLongitude: number;
  lastPingTime: string;
  createdAt: string;
}

interface TripListTableProps {
  trips: Trip[];
}

const StatusCard: React.FC<TripListTableProps> = ({ trips }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '16px 24px 24px',
        gap: '24px',
        width: '100%', // Full width of the container
        boxSizing: 'border-box',
      }}
    >
      {/* First Container (Proportional width 4) */}
      <Paper
        elevation={0}
        sx={{
          flexGrow: 4, // Relative size 4
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '12px 24px',
          height: '100px',
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
          borderRadius: '8px',
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
            Total Trips
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
      </Paper>

      {/* Second Container (Proportional width 5) */}
      <Paper
  elevation={0}
  sx={{
    flexGrow: 5, // Relative size 5 for the entire paper
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '12px 24px',
    height: '100px',
    background: '#FFFFFF',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
  }}
>
  {/* First Box (Dynamic width) */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '16px',
      flexGrow: 2, // Higher flexGrow to make this box take up more space
    }}
  >
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

  {/* Divider with gap */}
  <Divider
    orientation="vertical"
    flexItem
    sx={{
      height: '64px',
      alignSelf: 'center',
      backgroundColor: '#E0E0E0',
      marginLeft: '16px',  // Gap on the left
      marginRight: '16px', // Gap on the right
    }}
  />

  {/* Second Box (Fixed width) */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 0, // Fixed size for this box
      minWidth: '100px', // Optional: can be adjusted based on design
    }}
  >
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        transform: 'rotate(0deg)',
      }}
    >
      <CircularProgress
        variant="determinate"
        value={80}
        size={52}
        thickness={4.5}
        sx={{ color: '#00C28B' }}
      />
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

    <Box
      sx={{
        textAlign: 'center',
        marginTop: '8px',
        display: 'flex',
        gap: '4px',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Source Sans Pro',
          fontWeight: 400,
          fontSize: '14px',
          color: '#666666',
        }}
      >
        Ontime:
      </Typography>
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 500,
          fontSize: '14px',
          color: '#0057D1',
        }}
      >
        1,23,456
      </Typography>
    </Box>
  </Box>
</Paper>



      {/* Third Container (Proportional width 7) */}
    <Paper
        elevation={0}
        sx={{
          flexGrow: 7, // Relative size 7
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',  // Align items vertically centered
          justifyContent: 'space-between',  // Ensure the spacing between sections
          height: '100px',
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
          borderRadius: '8px',
        }}
      >
        {/* Delayed Section */}
        <Box
          sx={{
            flex: 1.2,
            backgroundColor: '#FFEEEE',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0 24px',  // Removed vertical padding, only kept horizontal
            height: '100%',  // Ensure it occupies full height
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

        {/* In Transit Section */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 24px' }}>
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

        {/* Delivered Section */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 24px' }}>
          <Typography variant="subtitle1" color="textSecondary" sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600 }}>
            Delivered
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
      </Paper>


    </Box>
  );
};

export default StatusCard;
