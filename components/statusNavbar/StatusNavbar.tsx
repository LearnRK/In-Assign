import React from 'react';
import { Grid, Box } from '@mui/material';
import DeliveredStatCard2 from './DeliveredStatCard2';
import TotalTripsStatCard2 from './TotalTripsStatCard2';
import StatusStatCard2 from './StatusStatCard2';

const StatusNavBar: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 24px',
                gap: '24px',
                width: '100%', // Full width of the container
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)', // Optional: for card shadow effect
                border: '1px solid #E0E0E0',
            }}
        >
            <Grid container spacing={3} sx={{ width: '100%' }}>
                {/* Total Trips Card - span 2 columns */}
                <Grid item xs={12} sm={2}>
                    <Box
                        sx={{
                            padding: '16px',
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <TotalTripsStatCard2 title="Total trips" value="18,033" />
                    </Box>
                </Grid>

                {/* Delivered with Circular Progress - span 3 columns */}
                <Grid item xs={12} sm={3}>
                    <Box
                        sx={{
                            padding: '16px',
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <DeliveredStatCard2 />
                    </Box>
                </Grid>

                {/* Status Card (Delayed, In Transit, Delivered) - span 4 columns */}
                <Grid item xs={12} sm={4}>
                    <Box
                        sx={{
                            padding: '16px',
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <StatusStatCard2 />
                    </Box>
                </Grid>

                {/* Filler space to make it 12 columns */}
                <Grid item xs={false} sm={3} />
            </Grid>
        </Box>
    );
};

export default StatusNavBar;
