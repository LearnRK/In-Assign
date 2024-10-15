import React from 'react';
import { Box } from '@mui/material';
import { Trip } from '@/extra/extra/GetData';
import Header from '@/components/header/header';
import StatusCard from '@/components/statusCard/StatusCard';
import { fetchTripsFromDB } from '../actions/GetData';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Login from '@/components/auth/Login';
import TripListTable2 from '@/components/tripListTable2/TripListTable2';

const Dashboard = async () => {
  console.log("In Dashboard component, starting to load...");

  // Fetch trips and session data with error handling
  try {
    const trips: Trip[] = await fetchTripsFromDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("No session found, redirecting to login...");
      return (
        <div>
          <Login />
        </div>
      );
    }

    return (
      <Box
        sx={{
          height: '96.5vh',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: "24px"
        }}
      >

        <Box sx={{ flexShrink: 0 }}>
          <Header />
        </Box>

        <Box sx={{ flexShrink: 0, mt: 2 }}>
          <StatusCard trips={trips} />
        </Box>

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
          <TripListTable2 trips={trips} />
        </Box>
      </Box>
    );  

  } catch (error) {
    console.error("Error occurred in Dashboard component:", error);
    return <div>Failed to load the page. Please try again later.</div>;
  }
};

export default Dashboard;
