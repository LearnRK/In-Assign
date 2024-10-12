// components/TripStatusButton.tsx
import React from 'react';
import { Chip } from '@mui/material';

interface TripStatusButtonProps {
    type: string; // Type of trip status
}

const TripStatusButton: React.FC<TripStatusButtonProps> = ({ type }) => {
    return (
        <Chip
            label={type}
            sx={{
                backgroundColor: '#D7E3FE', // Default lighter blue background
                color: '#1E3A8A', // Default dark blue text color
                borderRadius: '4px', // Match Figma border radius
                height: '24px', // Match Figma height
                width: '180px', // Match Figma width
                // padding: '4px', // Match Figma padding
                fontSize: '12px', // Match Figma font size
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Ensure text is centered
                fontWeight: '500', // Match Figma font weight
                gap: '10px', // Match Figma gap
                boxShadow: 'none', // Flat design, no shadow
                textTransform: 'none', // Ensure consistent casing (avoid auto-capitalization)
                letterSpacing: '0.4px', // Match letter spacing from Figma
            }}
        />
    );
};

export default TripStatusButton;
