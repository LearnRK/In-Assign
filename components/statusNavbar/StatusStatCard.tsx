import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';

// Type for the component's props, if needed in the future
interface StatusStatCardProps {}

const StatusStatCard: React.FC<StatusStatCardProps> = () => {
    return (
        <Paper
            elevation={2}
            sx={{
                padding: 0, // Remove padding
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'stretch', // Ensure all sections stretch to fill the height
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
                height: '100px', // Consistent height for all sections
                width: '100%', // Ensure full width
                textAlign: 'center',
                overflow: 'hidden', // Ensure background color fills the entire area
            }}
        >
            {/* Delayed Section */}
            <Box
                sx={{
                    flex: 1.1, // Adjust width of Delayed section
                    backgroundColor: '#ffebee', // Ensure background fills the entire box
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                }}
            >
                <Typography
                    variant="subtitle1"
                    color="error"
                    sx={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }} // Increased font weight to 600
                >
                    Delayed
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '28px' }}>
                    18,033
                </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />

            {/* In Transit Section */}
            <Box
                sx={{
                    flex: 1, // Keep In transit section at normal width
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }} // Adjust weight to 600
                >
                    In transit
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '28px' }}>
                        18,033
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            backgroundColor: '#E3F2FD',
                            borderRadius: '4px',
                            padding: '1px 4px', // Slightly reduce padding around the percentage
                            marginLeft: '8px',
                            fontSize: '12px',
                            display: 'inline-block', // Ensure proper centering
                            alignSelf: 'center', // Make sure it centers vertically
                        }}
                    >
                        72%
                    </Typography>
                </Box>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />

            {/* Delivered Section */}
            <Box
                sx={{
                    flex: 1, // Keep Delivered section at normal width
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '12px',
                }}
            >
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }} // Adjust weight to 600
                >
                    Delivered
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '28px' }}>
                        18,033
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            backgroundColor: '#E3F2FD',
                            borderRadius: '4px',
                            padding: '1px 4px', // Slightly reduce padding around the percentage
                            marginLeft: '8px',
                            fontSize: '12px',
                            display: 'inline-block', // Ensure proper centering
                            alignSelf: 'center', // Make sure it centers vertically
                        }}
                    >
                        72%
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default StatusStatCard;
