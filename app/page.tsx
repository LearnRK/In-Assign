import React from 'react';
import { Box } from '@mui/material';
import TripListTable from '@/components/tripListTable/TripListTable';
import StatusNavBar from '@/components/statusNavbar/StatusNavbar';
import { fetchTripsFromDB, Trip } from '@/components/tripListTable/GetData';
import Header from '@/components/header/header';
import StatusCard from '@/components/statusNavbar/StatusCard';
import TripListTable2 from '@/components/tripListTable/TripListTable2';

const Dashboard = async () => {
  // Fetching trips data directly in the Server Component
  const trips: Trip[] = await fetchTripsFromDB();

  return (
    <Box
      sx={{
        height: '100vh', // Full screen height
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header should take a fixed height */}
      <Box sx={{ flexShrink: 0 }}>
        <Header />
      </Box>

      {/* StatusNavBar should take its necessary height */}
      <Box sx={{ flexShrink: 0, mt: 2 }}> 
        {/* <StatusNavBar /> */}
        <StatusCard />
      </Box>

      {/* Table component grows to fill the remaining space */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <TripListTable2 trips={trips} />
      </Box>
    </Box>
  );
};

export default Dashboard;
