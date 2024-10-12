// components/TATStatusButton.tsx

import React from 'react';
import { Chip } from '@mui/material';

// Define the structure for the status colors and styles
interface StatusColors {
    background: string;
    color: string;
}

// TAT status colors mapped to specific statuses with the Figma-defined colors and styles
const tatStatusColors: Record<string, StatusColors> = {
    'On Time': { background: '#C2FAEA', color: '#008F66' }, // Green background, dark green text
    'Delayed': { background: '#F9D7D7', color: '#CC3333' }, // Red background, dark red text
    'Other': { background: '#FFECDB', color: '#D97F30' },   // Orange background, dark orange text
};

// Define the props type for TATStatusButton
interface TATStatusButtonProps {
    type: string; // Type of status
}

const TATStatusButton: React.FC<TATStatusButtonProps> = ({ type }) => {
    // Replace "On-time" with "On Time"
    const displayType = type === 'On-time' ? 'On Time' : type;

    // Get the color for the specific status or default to a fallback
    const statusColor = tatStatusColors[displayType] || { background: '#E0E0E0', color: '#000000' }; 

    return (
        <Chip
            label={displayType} // Use the displayType variable for the label
            sx={{
                display: 'flex', // Flexbox as per Figma design
                flexDirection: 'column', // Column layout for badges
                alignItems: 'center', // Center align
                padding: '4px', // Padding from Figma
                width: '104px', // Fixed width from Figma
                height: '24px', // Fixed height from Figma
                backgroundColor: statusColor.background, // Dynamic background based on status
                color: statusColor.color, // Dynamic text color based on status
                borderRadius: '4px', // Figma border radius
                fontSize: '12px', // Text size as per Figma
                fontWeight: 400, // Normal font weight for body text
                textAlign: 'center', // Center the text inside the chip
                letterSpacing: '0.4px', // Letter spacing from Figma
                lineHeight: '16px', // Line height to match Figma
                fontFamily: 'Source Sans Pro', // Font family as per Figma
                boxShadow: 'none', // Flat design as per Figma (no shadow)
            }}
        />
    );
};

export default TATStatusButton;
