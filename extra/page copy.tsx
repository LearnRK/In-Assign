// app/dashboard/page.tsx
"use client"; // Mark this component as a client component

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TripListTable2 from '@/components/tripListTable/TripListTable-original';
import Header from '@/components/header/header';
import StatusCard from '@/components/statusCard/StatusCard';
import keycloak from '@/keycloak/keycloak'; // Import your Keycloak instance
import { fetchTripsFromDB, Trip } from '@/extra/extra/GetData';

const Dashboard = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'login-required',
          checkLoginIframe: false,
          pkceMethod: 'S256', // Use PKCE method for added security
          flow: 'standard', // Use standard flow for confidential clients
        });

        if (!authenticated) {
          window.location.reload(); // Reload if not authenticated
        } else {
          const tripsData: Trip[] = await fetchTripsFromDB(); // Fetch trips if authenticated
          setTrips(tripsData);
        }
      } catch (error) {
        console.error('Keycloak authentication failed:', error);
        // Redirect to login page if Keycloak initialization fails
        keycloak.login();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }

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
        <StatusCard trips={trips} />
      </Box>

      {/* Table component grows to fill the remaining space */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <TripListTable2 trips={trips} />
      </Box>
    </Box>
  );
};

export default Dashboard;


























// import React from 'react';
// import { Box } from '@mui/material';
// import TripListTable from '@/components/tripListTable/TripListTable';
// import StatusNavBar from '@/components/statusNavbar/StatusNavbar';
// import { fetchTripsFromDB, Trip } from '@/components/tripListTable/GetData';
// import Header from '@/components/header/header';
// import StatusCard from '@/components/statusNavbar/StatusCard';
// import TripListTable2 from '@/components/tripListTable/TripListTable2';

// const Dashboard = async () => {
//   // Fetching trips data directly in the Server Component
//   const trips: Trip[] = await fetchTripsFromDB();

//   return (
//     <Box
//       sx={{
//         height: '100vh', // Full screen height
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       {/* Header should take a fixed height */}
//       <Box sx={{ flexShrink: 0 }}>
//         <Header />
//       </Box>

//       {/* StatusNavBar should take its necessary height */}
//       <Box sx={{ flexShrink: 0, mt: 2 }}> 
//         {/* <StatusNavBar /> */}
//         <StatusCard />
//       </Box>

//       {/* Table component grows to fill the remaining space */}
//       <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
//         <TripListTable2 trips={trips} />
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;
