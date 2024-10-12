import React from "react";
import { Box, Button, Typography } from "@mui/material";

const TableHeader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", // Ensures title on the left, buttons on the right
        alignItems: "center",
        padding: "8px 20px",
        width: "100%", // Take the entire width
        height: "48px",
        background: "#FFFFFF",
        borderBottom: "1px solid #F2F2F2",
        borderRadius: "8px 8px 0px 0px",
        boxSizing: "border-box",
      }}
    >
      {/* Trip List Title */}
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

      {/* Buttons aligned to the right */}
      <Box
        sx={{
          display: "flex",
          gap: "8px", // Even spacing between buttons
        }}
      >
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
        >
          Update status
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "96px",
            height: "32px",
            background: "#0057D1",
            borderRadius: "4px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: "11px",
            lineHeight: "16px",
            color: "#FFFFFF",
            textTransform: "none",
            padding: "8px",
          }}
        >
          Add Trip
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
