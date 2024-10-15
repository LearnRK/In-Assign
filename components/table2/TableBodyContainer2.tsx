import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
} from "@mui/material";
import { Trip } from "../../types/tripTypes";
import TripStatusButton from "../buttons/TripStatusButton";
import TATStatusButton from "../buttons/TATStatusButton";

interface TableBodyContainerProps {
  currentData: Trip[]; // Pass the current page data
  selectedRows: string[]; // Pass selected rows
  handleRowSelect: (tripId: string) => void; // Pass the row select handler
  selectAll: boolean; // Whether to select all rows
  handleSelectAll: () => void; // Handler to toggle select all
  handleColumnClick: (column: keyof Trip | 'tripStatus' | 'tatStatus') => void; // Handler for sorting column
  TAT: (trip: Trip) => string; // Function to compute TAT status
}

const TableBodyContainer2: React.FC<TableBodyContainerProps> = ({
  currentData,
  selectedRows,
  handleRowSelect,
  selectAll,
  handleSelectAll,
  handleColumnClick,
  TAT,
}) => {
  return (
    <Table stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#F1F3F4" }}>
          <TableCell padding="checkbox" sx={{ minWidth: 40 }}>
            <Checkbox color="primary" checked={selectAll} onChange={handleSelectAll} />
          </TableCell>
          <TableCell onClick={() => handleColumnClick("tripId")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
            Trip id
          </TableCell>
          <TableCell onClick={() => handleColumnClick("transporter")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
            Transporter
          </TableCell>
          <TableCell onClick={() => handleColumnClick("source")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
            Source
          </TableCell>
          <TableCell onClick={() => handleColumnClick("dest")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
            Destination
          </TableCell>
          <TableCell onClick={() => handleColumnClick("phoneNumber")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
            Phone
          </TableCell>
          <TableCell onClick={() => handleColumnClick("etaDays")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
            ETA
          </TableCell>
          <TableCell onClick={() => handleColumnClick("distanceRemaining")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
            Distance remaining
          </TableCell>
          <TableCell onClick={() => handleColumnClick("tripStatus")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
            Trip status
          </TableCell>
          <TableCell onClick={() => handleColumnClick("tatStatus")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
            TAT status
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {currentData.map((row) => (
          <TableRow hover sx={{ height: "40px", padding: "0 20px", gap: "16px" }} key={row.tripId}>
            <TableCell padding="checkbox">
              <Checkbox color="primary" checked={selectedRows.includes(row.tripId)} onChange={() => handleRowSelect(row.tripId)} />
            </TableCell>
            <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: "bold" }}>
              {row.tripId}
            </TableCell>
            <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {row.transporter}
            </TableCell>
            <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {row.source}
            </TableCell>
            <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {row.dest}
            </TableCell>
            <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {row.phoneNumber}
            </TableCell>
            <TableCell>{row.etaDays}</TableCell>
            <TableCell>{row.distanceRemaining}</TableCell>
            <TableCell>
              <TripStatusButton type={row.currenStatus} />
            </TableCell>
            <TableCell>
              <TATStatusButton type={TAT(row)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableBodyContainer2;
