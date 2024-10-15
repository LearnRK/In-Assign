"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Pagination,
  PaginationItem,
  SelectChangeEvent,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Trip } from "../../types/tripTypes";
import TableRowComponent from "../table/TableRowComponent";
import { TAT } from "../helpers/TAT";

interface TripListTableProps {
  trips: Trip[];
}

const TripListTable: React.FC<TripListTableProps> = ({ trips }) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [tripData, setTripData] = useState<Trip[]>(trips);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<keyof Trip | "tripStatus" | "tatStatus">("tripStatus");

  const totalRecords = tripData.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const currentData = tripData
    .sort((a, b) => {
      const order = sortDirection === "asc" ? 1 : -1;
      if (sortColumn === "tripStatus") {
        const statusOrder = ["Delivered", "In Transit", "Booked"];
        return order * (statusOrder.indexOf(a.currenStatus) - statusOrder.indexOf(b.currenStatus));
      }
      if (sortColumn === "tatStatus") {
        const tatA = TAT(a);
        const tatB = TAT(b);
        const tatOrder = ["On Time", "Other", "Delayed"];
        return order * (tatOrder.indexOf(tatA) - tatOrder.indexOf(tatB));
      }
      return a[sortColumn] > b[sortColumn] ? order : -order;
    })
    .slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleRowSelect = (tripId: string) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(tripId)
        ? prevSelected.filter((id) => id !== tripId)
        : [...prevSelected, tripId]
    );
  };

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
    if (!selectAll) {
      setSelectedRows(currentData.map((trip) => trip.tripId));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "calc(100%)",
        height: "calc(100vh - 48px)",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
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
              onClick={() => console.log('Update status')}
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
            onClick={() => console.log('Add Trip')}
          >
            Add Trip
          </Button>
        </Box>
      </Box>

      <TableContainer
        sx={{
          flexGrow: 1,
          maxHeight: "calc(100vh - 360px)",
          overflowY: "auto",
        }}
      >
        <Table stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F1F3F4" }}>
              <TableCell padding="checkbox" sx={{ minWidth: 40 }}>
                <Checkbox color="primary" checked={selectAll} onChange={handleSelectAll} />
              </TableCell>
              <TableCell onClick={() => setSortColumn("tripId")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
                Trip id
              </TableCell>
              <TableCell onClick={() => setSortColumn("transporter")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
                Transporter
              </TableCell>
              <TableCell onClick={() => setSortColumn("source")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
                Source
              </TableCell>
              <TableCell onClick={() => setSortColumn("dest")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
                Destination
              </TableCell>
              <TableCell onClick={() => setSortColumn("phoneNumber")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
                Phone
              </TableCell>
              <TableCell onClick={() => setSortColumn("etaDays")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
                ETA
              </TableCell>
              <TableCell onClick={() => setSortColumn("distanceRemaining")} sx={{ cursor: "pointer", fontWeight: "bold" }}>
                Distance remaining
              </TableCell>
              <TableCell onClick={() => setSortColumn("tripStatus")} sx={{ fontWeight: "bold", cursor: "pointer" }}>
                Trip status
              </TableCell>
              <TableCell onClick={() => setSortColumn("tatStatus")} sx={{ fontWeight: "bold", cursor: "pointer" }}>
                TAT status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((trip) => (
              <TableRowComponent
                key={trip.tripId}
                trip={trip}
                selectedRows={selectedRows}
                onRowSelect={handleRowSelect}
                TAT={TAT}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E0E0E0",
          pt: "10px",
          pb: "24px",
          paddingX: "24px"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography fontSize="12px" fontWeight={400} color="#1A1A1A">
            Viewing {rowsPerPage * (page - 1) + 1}-{" "}
            {Math.min(rowsPerPage * page, totalRecords)} of {totalRecords} records
          </Typography>
          <Typography fontSize="12px" fontWeight={400} color="#1A1A1A">
            Rows per page:
          </Typography>
          <Select
            value={rowsPerPage}
            onChange={(event: SelectChangeEvent<number>) => {
              const value = event.target.value as number;
              setRowsPerPage(value);
              handleRowsPerPageChange(event);
            }}
            sx={{ height: "24px", width: "60px", fontSize: "12px" }}
          >
            {[10, 20, 30, 50].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
          size="small"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              components={{ previous: ArrowBackIos, next: ArrowForwardIos }}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#0057D1",
                  color: "#FFFFFF",
                },
              }}
            />
          )}
        />
      </Box>
    </Paper>
  );
};

export default TripListTable;
