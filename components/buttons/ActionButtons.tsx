import React from 'react';
import { Box, Button } from '@mui/material';
import { ActionButtonsProps } from '@/types/actionButtonsTypes';

const ActionButtons: React.FC<ActionButtonsProps> = ({ selectedRows, openUpdateDialog, openAddTripDialog }) => (
  <Box sx={{ display: "flex", gap: "8px" }}>
    {selectedRows.length >= 1 && (
      <Button
        variant="outlined"
        sx={{ width: "96px", height: "32px", borderRadius: "4px", fontSize: "11px" }}
        onClick={openUpdateDialog}
      >
        Update status
      </Button>
    )}
    <Button
      variant="contained"
      sx={{ width: "96px", height: "32px", backgroundColor: "#0057D1", borderRadius: "4px", fontSize: "11px" }}
      onClick={openAddTripDialog}
    >
      Add Trip
    </Button>
  </Box>
);

export default ActionButtons;
