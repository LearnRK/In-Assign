import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface TableHeaderProps {
    selectedRows: string[]; // Pass selectedRows as a prop
    openUpdateDialog: () => void; // Correct the function prop types
    openAddDialog: () => void;     // Correct the function prop types
  }
  
  const TableHeader: React.FC<TableHeaderProps> = ({ selectedRows, openUpdateDialog, openAddDialog }) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 20px",
          width: "100%",
          background: "#FFFFFF",
          borderBottom: "1px solid #F2F2F2",
          boxSizing: "border-box",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#1A1A1A",
          }}
        >
          Trip list
        </Typography>
  
        <Box sx={{ display: "flex", gap: "8px" }}>
          {selectedRows.length >= 1 && (
            <Button
              variant="outlined"
              sx={{
                width: "96px",
                height: "32px",
                background: "#FFFFFF",
                border: "1px solid #0057D1",
                borderRadius: "4px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                lineHeight: "16px",
                color: "#0057D1",
                textTransform: "none",
                padding: "8px",
              }}
              onClick={openUpdateDialog} // Correct: Don't invoke the function, just pass it
            >
              Update status
            </Button>
          )}
          <Button
            variant="contained"
            sx={{
              width: "96px",
              height: "32px",
              background: "#0057D1",
              borderRadius: "4px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "11px",
              lineHeight: "16px",
              color: "#FFFFFF",
              textTransform: "none",
              padding: "8px",
            }}
            onClick={openAddDialog} // Correct: Don't invoke the function, just pass it
          >
            Add Trip
          </Button>
        </Box>
      </Box>
    );
  };

  export default TableHeader;