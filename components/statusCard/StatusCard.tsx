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

// Logic to check if the trip is delayed
const isDelayed = (trip: Trip): boolean => {
  const { etaDays, tripStartTime, tripEndTime, lastPingTime } = trip;

  if (etaDays <= 0) return false;

  let actualTripTime: number | undefined;

  if (tripEndTime) {
    actualTripTime = new Date(tripEndTime).getTime() - new Date(tripStartTime).getTime();
  } else if (lastPingTime) {
    actualTripTime = new Date(lastPingTime).getTime() - new Date(tripStartTime).getTime();
  } else {
    return false;
  }

  const actualTripDays = actualTripTime / (1000 * 60 * 60 * 24);
  return actualTripDays > etaDays;
};

interface TripListTableProps {
  trips: Trip[];
}

const StatusCard: React.FC<TripListTableProps> = ({ trips }) => {
  // Calculate total trips
  const totalTrips = trips.length;

  // Calculate delivered trips
  const deliveredTrips = trips.filter(trip => trip.currenStatus === 'Delivered').length;

  // Calculate delayed consignments based on isDelayed function
  const delayedTrips = trips.filter(isDelayed).length;

  // Calculate in-transit trips
  const inTransitTrips = trips.filter(trip => trip.currenStatus === 'In Transit').length;

  // Calculate on-time percentage out of delivered trips
  const onTimeDeliveredTrips = trips.filter(trip => {
    if (trip.currenStatus === 'Delivered' && trip.tripEndTime && trip.etaDays > 0) {
      const actualDuration = (new Date(trip.tripEndTime).getTime() - new Date(trip.tripStartTime).getTime()) / (1000 * 60 * 60 * 24);
      return actualDuration <= trip.etaDays;
    }
    return false;
  }).length;

  const onTimePercentage = deliveredTrips > 0 ? (onTimeDeliveredTrips / deliveredTrips) * 100 : 0;

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
      {/* First Container (Total Trips) */}
      <Paper
        elevation={0}
        sx={{
          flexGrow: 5, // Relative size 4
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
            {totalTrips}
          </Typography>
        </Box>
      </Paper>

      {/* Second Container (Delivered and On-Time) */}
      <Paper
        elevation={0}
        sx={{
          flexGrow: 4,
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '16px',
            flexGrow: 2,
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
            {deliveredTrips}
          </Typography>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: '64px',
            alignSelf: 'center',
            backgroundColor: '#E0E0E0',
            marginLeft: '16px',
            marginRight: '16px',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 0,
            minWidth: '100px',
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
              value={onTimePercentage}
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
              {Math.round(onTimePercentage)}%
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
              {onTimeDeliveredTrips}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Third Container (Delayed and In Transit) */}
      <Paper
        elevation={0}
        sx={{
          flexGrow: 12,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
            padding: '0 24px',
            height: '100%',
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
            {delayedTrips}
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ borderColor: '#E0E0E0' }} />

        {/* In Transit Section */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 24px' }}>
          <Typography variant="subtitle1" color="textSecondary" sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600 }}>
            In transit
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 'bold', fontSize: '24px' }}>{inTransitTrips}</Typography>
            <Typography
              sx={{ backgroundColor: '#D7E3FE', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px', fontSize: '12px', fontWeight: 500 }}
            >
              {((inTransitTrips / totalTrips) * 100).toFixed(0)}%
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
            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 'bold', fontSize: '24px' }}>{deliveredTrips}</Typography>
            <Typography
              sx={{ backgroundColor: '#D7E3FE', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px', fontSize: '12px', fontWeight: 500 }}
            >
              {((deliveredTrips / totalTrips) * 100).toFixed(0)}%
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StatusCard;
