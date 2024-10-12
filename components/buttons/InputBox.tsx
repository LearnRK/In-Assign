import React from 'react';
import { TextField, Typography, FormControl } from '@mui/material';

interface TextInputProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, placeholder, name, value, onChange }) => {
  return (
    <FormControl margin="normal" sx={{ width: '280px', height: '56px' }}>
      {/* Label Text */}
      <Typography
        component="label"
        sx={{
          fontWeight: 500,
          fontSize: '11px',
          lineHeight: '16px',
          color: '#1A1A1A',
          marginBottom: '8px', // gap of 8px
        }}
      >
        {label}
      </Typography>

      {/* Text Input */}
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        sx={{
          '& .MuiInputBase-root': {
            width: '280px', // Fixed width from Figma
            height: '32px', // Fixed height from Figma
            padding: '8px 12px', // Padding from Figma
          },
          '& .MuiInputBase-input': {
            fontFamily: 'Source Sans Pro, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '0.4px',
            color: '#666666',
          },
          backgroundColor: '#FFFFFF',
          border: '1px solid #E0E0E0',
          borderRadius: '4px',
        }}
      />
    </FormControl>
  );
};

export default TextInput;
