import React from 'react';
import { Box } from '@mui/material';
import Header from '@/components/header/header';
import StatusCard from '@/components/statusCard/StatusCard';
import { fetchTripsFromDB } from './actions/GetData';
import { getServerSession } from 'next-auth';
import Login from '@/components/auth/Login';
import TripListTable from '@/components/tripListTable/TripListTable';
import { authOptions } from './utils/authOptions';
import { Trip } from '@/types/tripTypes';

const Dashboard = async () => {
  console.log("In Dashboard component, starting to load...");

  // Fetch trips and session data with error handling
  try {
    // Fetch trips data
    const trips: Trip[] = await fetchTripsFromDB();
    // console.log("Trips fetched successfully:", trips);

    // Fetch session data
    const session = await getServerSession(authOptions);
    // console.log("Session fetched successfully:", session);

    // Check if the session is valid
    if (!session) {
      console.log("No session found, redirecting to login...");
      return (
        <div>
          <Login />
        </div>
      );
    }

    // If session exists, render the dashboard
    return (
      <Box
        sx={{
          height: '96.5vh', // Full screen height
          display: 'flex',
          flexDirection: 'column',
          marginBottom: "24px"
        }}
      >

        {/* Header */}
        <Box sx={{ flexShrink: 0 }}>
          <Header />
        </Box>

        {/* StatusNavBar */}
        <Box sx={{ flexShrink: 0, mt: 2 }}>
          <StatusCard trips={trips} />
        </Box>

        {/* Trip Table */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            marginRight: "24px",
            marginLeft: "24px",
          }}
        >
          <TripListTable trips={trips} />
          {/* <TripListTable2 trips={trips} /> */}
        </Box>
      </Box>
    );

  } catch (error) {
    // Log any error that occurs during session or trip fetch
    console.error("Error occurred in Dashboard component:", error);
    return <div>Failed to load the page. Please try again later.</div>;
  }
};

export default Dashboard;
