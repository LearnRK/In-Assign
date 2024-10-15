import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DeleteTripHandler from '@/components/addTrip/DeleteTrip';

interface TableHeaderProps {
  selectedRows: string[]; // Array of selected row IDs
  openUpdateDialog: () => void; // Function to open the update dialog
  openAddDialog: () => void; // Function to open the add trip dialog
  onTripsDeleted: () => Promise<void>; // Callback to refetch trips after deletion
}

const TableHeader2: React.FC<TableHeaderProps> = ({ selectedRows, openUpdateDialog, openAddDialog, onTripsDeleted }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 20px',
        width: '100%',
        background: '#FFFFFF',
        borderBottom: '1px solid #F2F2F2',
        boxSizing: 'border-box',
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#1A1A1A',
        }}
      >
        Trip List
      </Typography>

      <Box sx={{ display: 'flex', gap: '8px' }}>

        {/* Use the DeleteTripHandler component for delete logic */}
        <DeleteTripHandler selectedRows={selectedRows} onTripsDeleted={onTripsDeleted} />

        {selectedRows.length >= 1 && (
          <Button
            variant="outlined"
            sx={{
              width: '96px',
              height: '32px',
              background: '#FFFFFF',
              border: '1px solid #0057D1',
              borderRadius: '4px',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: '11px',
              lineHeight: '16px',
              color: '#0057D1',
              textTransform: 'none',
              padding: '8px',
            }}
            onClick={openUpdateDialog}
          >
            Update Status
          </Button>
        )}

        <Button
          variant="contained"
          sx={{
            width: '96px',
            height: '32px',
            background: '#0057D1',
            borderRadius: '4px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '11px',
            lineHeight: '16px',
            color: '#FFFFFF',
            textTransform: 'none',
            padding: '8px',
          }}
          onClick={openAddDialog}
        >
          Add Trip
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader2;
