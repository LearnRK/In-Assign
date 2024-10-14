import React from 'react';
import { Box } from '@mui/material';
import TripListTable from '@/extra/extra/TripListTable';
import StatusNavBar from '@/extra/statusNavbar/StatusNavbar';
import { fetchTripsFromDB, Trip } from '@/extra/extra/GetData'; // Import your function

const Dashboard = async () => {
    // Fetching trips data directly in the Server Component
    const trips: Trip[] = await fetchTripsFromDB();

    return (
        <Box sx={{ p: 3 }}>
            <StatusNavBar />
            <TripListTable trips={trips} /> {/* Passing the fetched trips as prop */}
        </Box>
    );
};

export default Dashboard;
