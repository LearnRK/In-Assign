import React from 'react';
import { Box } from '@mui/material';
import TripListTable from '@/components/tripListTable/TripListTable';
import StatusNavBar from '@/components/statusNavbar/StatusNavbar';
import { fetchTripsFromDB, Trip } from '@/components/tripListTable/GetData'; // Import your function

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
