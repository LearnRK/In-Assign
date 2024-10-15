// src/components/tableRow/TableRowComponent.tsx
import React from "react";
import { TableRow, TableCell, Checkbox } from "@mui/material";
import { TableRowComponentProps } from "../../types/tableRowTypes";
import TripStatusButton from "../buttons/TripStatusButton";
import TATStatusButton from "../buttons/TATStatusButton";

const TableRowComponent: React.FC<TableRowComponentProps> = ({
  trip,
  selectedRows,
  onRowSelect,
  TAT,
}) => {
  return (
    <TableRow
      hover
      sx={{ height: "40px", padding: "0 20px", gap: "16px" }}
      key={trip.tripId}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={selectedRows.includes(trip.tripId)}
          onChange={() => onRowSelect(trip.tripId)}
        />
      </TableCell>
      <TableCell
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontWeight: "bold", // Makes the Trip id bold in the body
        }}
      >
        {trip.tripId}
      </TableCell>
      <TableCell
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {trip.transporter}
      </TableCell>
      <TableCell
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {trip.source}
      </TableCell>
      <TableCell
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {trip.dest}
      </TableCell>
      <TableCell
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {trip.phoneNumber}
      </TableCell>
      <TableCell>{trip.etaDays}</TableCell>
      <TableCell>{trip.distanceRemaining}</TableCell>
      <TableCell>
        <TripStatusButton type={trip.currenStatus} />
      </TableCell>
      <TableCell>
        <TATStatusButton type={TAT(trip)} />
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
