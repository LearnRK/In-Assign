import React from "react";
import { TableRow, TableCell, Checkbox } from "@mui/material";
import TripStatusButton from "../../components/buttons/TripStatusButton";
import TATStatusButton from "../../components/buttons/TATStatusButton";
import { Trip } from "./GetData";

interface TableRowComponentProps {
  row: Trip;
}

const TableRows: React.FC<TableRowComponentProps> = ({ row }) => {
  return (
    <TableRow hover sx={{ height: "40px", padding: "0 20px", gap: "16px" }}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" />
      </TableCell>
      <TableCell>{row.tripId}</TableCell>
      <TableCell>{row.transporter}</TableCell>
      <TableCell>{row.source}</TableCell>
      <TableCell>{row.dest}</TableCell>
      <TableCell>{row.phoneNumber}</TableCell>
      <TableCell>{row.etaDays}</TableCell>
      <TableCell>{row.distanceRemaining}</TableCell>
      <TableCell>
        <TripStatusButton type={row.currenStatus} />
      </TableCell>
      <TableCell>
        <TATStatusButton type={"On-time"} />
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
