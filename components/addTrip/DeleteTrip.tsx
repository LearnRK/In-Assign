import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { deleteTripsFromDatabase } from '@/app/actions/DeleteTrip2';

interface DeleteTripHandlerProps {
  selectedRows: string[];
  onTripsDeleted: () => Promise<void>;
}

const DeleteTripHandler: React.FC<DeleteTripHandlerProps> = ({ selectedRows, onTripsDeleted }) => {

  const handleDeleteTrips = async () => {
    if (selectedRows.length > 0) {
      try {
        await deleteTripsFromDatabase(selectedRows);
        await onTripsDeleted();
      } catch (error) {
        console.error('Error deleting selected trips:', error);
      }
    }
  };


  return (
    <>
      {selectedRows.length > 0 && (
        <Button
          variant="outlined"
          sx={{
            width: '96px',
            height: '32px',
            border: '1px solid #FF6961',
            borderRadius: '4px',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: '11px',
            lineHeight: '16px',
            color: '#FF6961',
            textTransform: 'none',
            padding: '8px',
          }}
          onClick={handleDeleteTrips}
        >
          Delete Trip
        </Button>
      )}

    </>
  );
};

export default DeleteTripHandler;
