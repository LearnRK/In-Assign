import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

// Define props for the component
interface TotalTripsStatCardProps {
    title: string;
    value: string | number;
    percentage?: string; // Optional percentage field, if needed
    highlightColor?: string; // Optional color for highlight, like for "Delayed"
}

const TotalTripsStatCard: React.FC<TotalTripsStatCardProps> = ({ title, value, percentage, highlightColor }) => {
    return (
        <Paper
            elevation={2}
            sx={{
                py: '12px',
                px: '24px',
                textAlign: 'left', // Aligning text to the left
                borderRadius: '8px',
                height: '100px',
                border: '1px solid #e0e0e0',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: highlightColor || 'inherit', // Apply background color for "Delayed" card
            }}
        >
            <Typography
                variant="subtitle1"
                color={highlightColor ? 'error' : 'textSecondary'}
                sx={{ fontWeight: '600', fontSize: '16px', marginBottom: '8px' }} // Adjust font size for title
            >
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '24px', marginRight: '8px' }}>
                    {value.toLocaleString()} {/* Format numbers with commas */}
                </Typography>
                {percentage && (
                    <Typography
                        variant="caption"
                        sx={{
                            backgroundColor: '#e0f7fa', // Light blue background for percentage badge
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#00796b', // Text color
                        }}
                    >
                        {percentage}
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default TotalTripsStatCard;
