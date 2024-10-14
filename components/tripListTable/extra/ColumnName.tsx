import React from "react";
import { TableRow, TableCell, Checkbox } from "@mui/material";

const ColumnName: React.FC = () => {
  return (
    <TableRow sx={{ backgroundColor: "#F1F3F4" }}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" />
      </TableCell>
      <TableCell sx={{ fontWeight: "bold", color: "#444" }}>Trip id</TableCell>
      <TableCell sx={{ fontWeight: "bold", color: "#444" }}>Transporter</TableCell>
      <TableCell sx={{ fontWeight: "bold", color: "#444" }}>Source</TableCell>
      <TableCell sx={{ fontWeight: "bold", color: "#444" }}>Destination</TableCell>
      <TableCell sx={{ fontWeight: "bold", color: "#444" }}>Phone</TableCell>
      <TableCell sx={{ fontWeight: "bold", color: "#444" }}>ETA</TableCell>
      <TableCell sx={{ fontWeight: "bold", color: "#444" }}>Distance remaining</TableCell>
      <TableCell sx={{ fontWeight: "bold", color: "#444" }}>Trip status</TableCell>
      <TableCell sx={{ fontWeight: "bold", color: "#444" }}>TAT status</TableCell>
    </TableRow>
  );
};

export default ColumnName;
