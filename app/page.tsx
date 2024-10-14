// "use client"; // Ensure this is a client component

// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '@/context/AuthContext'; // Import AuthContext
// import { useRouter } from 'next/navigation'; // Use this for redirection

// const SecurePage = () => {
//   const { authenticated, keycloak } = useContext(AuthContext) || { authenticated: false, keycloak: null }; // Use default values
//   const [loading, setLoading] = useState(true);
//   const router = useRouter(); // Use router for redirection

//   useEffect(() => {
//     const checkAuth = async () => {
//       if (!authenticated) {
//         if (keycloak) {
//           try {
//             await keycloak.login(); // Redirect to Keycloak login if not authenticated
//           } catch (error) {
//             console.error('Error during Keycloak login:', error);
//           }
//         } else {
//           console.error('Keycloak instance is not available.');
//         }
//       } else {
//         setLoading(false); // Set loading to false if authenticated
//       }
//     };

//     checkAuth(); // Call the function to check authentication
//   }, [authenticated, keycloak]);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state while checking authentication
//   }

//   return (
//     <div>
//       <h1>Secure Page</h1>
//       <p>This page is accessible only after Keycloak authentication.</p>
//     </div>
//   );
// };

// export default SecurePage;






























// "use client"; // Mark this component as a client component

// import React, { useEffect, useState, useContext } from 'react';
// import { Box } from '@mui/material';
// import TripListTable2 from '@/components/tripListTable/TripListTable2';
// import Header from '@/components/header/header';
// import StatusCard from '@/components/statusNavbar/StatusCard';
// import { AuthContext } from '@/context/AuthContext'; // Import AuthContext
// import { fetchTripsFromDB, Trip } from '@/components/tripListTable/GetData';

// const Dashboard = () => {
//   const context = useContext(AuthContext); // Retrieve context
//   const authenticated = context?.authenticated || false; // Provide a default
//   const keycloak = context?.keycloak || null; // Provide a default

//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       if (keycloak) {
//         if (authenticated) {
//           try {
//             const tripsData: Trip[] = await fetchTripsFromDB();
//             setTrips(tripsData);
//           } catch (error) {
//             console.error('Error fetching trips:', error);
//           } finally {
//             setLoading(false);
//           }
//         } else {
//           await keycloak.login(); // Redirect to Keycloak login if not authenticated
//         }
//       } else {
//         console.error('Keycloak instance is not available.'); // Log an error if keycloak is not available
//       }
//     };

//     checkAuth(); // Call the function to check authentication
//   }, [authenticated, keycloak]);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state while checking authentication
//   }

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
