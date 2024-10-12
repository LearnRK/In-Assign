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
import TripStatusButton from "../../buttons/TripStatusButton";
import TATStatusButton from "../../buttons/TATStatusButton";

interface Trip {
  id: string;
  tripId: string;
  transporter: string;
  tripStartTime: string;
  currentStatusCode: string;
  currenStatus: string;
  phoneNumber: string;
  etaDays: number;
  distanceRemaining: number;
  tripEndTime: string;
  source: string;
  sourceLatitude: number;
  sourceLongitude: number;
  dest: string;
  destLatitude: number;
  destLongitude: number;
  lastPingTime: string;
  createdAt: string;
}

interface TripListTableProps {
  trips: Trip[];
}

const TripListTable2: React.FC<TripListTableProps> = ({ trips }) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const totalRecords = trips.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const currentData = trips.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleRowSelect = (tripId: string) => {
    if (selectedRows.includes(tripId)) {
      setSelectedRows(selectedRows.filter((id) => id !== tripId));
    } else {
      setSelectedRows([...selectedRows, tripId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map((trip) => trip.tripId));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (selectedRows.length === currentData.length && currentData.length > 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows, currentData]);

  const TAT = (trip: Trip): string => {
    const { etaDays, tripStartTime, tripEndTime, lastPingTime } = trip;

    // If etaDays is 0 or negative, return "Other"
    if (etaDays <= 0) {
      return "Other";
    }

    let actualTripTime: number | undefined;

    // Use tripEndTime if available, otherwise use lastPingTime
    if (tripEndTime) {
      actualTripTime = new Date(tripEndTime).getTime() - new Date(tripStartTime).getTime();
    } else if (lastPingTime) {
      actualTripTime = new Date(lastPingTime).getTime() - new Date(tripStartTime).getTime();
    } else {
      return "Other"; // No valid trip time data
    }

    // Convert actual trip time from milliseconds to days
    const actualTripDays = actualTripTime / (1000 * 60 * 60 * 24);

    // Compare etaDays with actual trip days to determine the TAT status
    if (etaDays >= actualTripDays) {
      return "On Time";
    } else {
      return "Delayed";
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
        padding: "16px 24px",
        width: "calc(100% - 48px)", // Adjust width to account for left/right margin
        height: "calc(100vh - 48px)", // Full height minus margins
        border: "1px solid #E0E0E0",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        marginLeft: "24px",   // Left margin
        marginRight: "24px",  // Right margin
        marginBottom: "24px", // Bottom margin
        overflow: "hidden",   // Prevent content from overflowing the container
      }}
    >
      {/* Table Header */}
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
          {selectedRows.length > 0 && (
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
          )}
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

      {/* Table Container */}
      <TableContainer
        sx={{
          flexGrow: 1,
          maxHeight: "calc(100vh - 360px)", // Adjust to control the scroll area height
          overflowY: "auto",
        }}
      >
        <Table stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
          {/* Column Names */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F1F3F4" }}>
              <TableCell padding="checkbox" sx={{ minWidth: 40 }}>
                <Checkbox
                  color="primary"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444", minWidth: 80 }}>
                Trip id
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444", minWidth: 60 }}>
                Transporter
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444", minWidth: 60 }}>
                Source
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444", minWidth: 60 }}>
                Destination
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444", minWidth: 100 }}>
                Phone
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444", minWidth: 60 }}>
                ETA
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444", minWidth: 100 }}>
                Distance remaining
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444", minWidth: 140 }}>
                Trip status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#444", minWidth: 90 }}>
                TAT status
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Rows */}
          <TableBody>
            {currentData.map((row) => (
              <TableRow
                hover
                sx={{ height: "40px", padding: "0 20px", gap: "16px" }}
                key={row.tripId}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedRows.includes(row.tripId)}
                    onChange={() => handleRowSelect(row.tripId)}
                  />
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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
                <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {row.etaDays}
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {row.distanceRemaining}
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <TripStatusButton type={row.currenStatus} />
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <TATStatusButton type={TAT(row)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E0E0E0",
          pt: "10px",
          pb: "24px", // Adding padding bottom to ensure the pagination stays above the edge
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

export default TripListTable2;
