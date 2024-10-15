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
import TripStatusButton from "../buttons/TripStatusButton";
import TATStatusButton from "../buttons/TATStatusButton";
import AddTripDialog from "../addTrip/AddTrip";
import UpdateTripDialog from "../addTrip/UpdateTrip";
import { addTripToDatabase } from "@/app/actions/AddTrip";
import { updateTripToDatabase } from "@/app/actions/UpdateTrip";

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

interface TripForm {
  tripId: string;
  transporter: string;
  source: string;
  destination: string;
  phone: string;
}

interface UpdateTripForm {
  transporter: string;
  time: Date | null;
}

interface TripListTableProps {
  trips: Trip[];
}

const TripListTable2: React.FC<TripListTableProps> = ({ trips }) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [tripData, setTripData] = useState<Trip[]>(trips);
  const [selectedTrips, setSelectedTrips] = useState<Trip[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<keyof Trip | 'tripStatus' | 'tatStatus'>('tripStatus');

  const totalRecords = tripData.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  // TAT function should be placed here to avoid the error
  const TAT = (trip: Trip): string => {
    const { etaDays, tripStartTime, tripEndTime, lastPingTime } = trip;

    if (etaDays <= 0) {
      return "Other";
    }

    let actualTripTime: number | undefined;

    if (tripEndTime) {
      actualTripTime = new Date(tripEndTime).getTime() - new Date(tripStartTime).getTime();
    } else if (lastPingTime) {
      actualTripTime = new Date(lastPingTime).getTime() - new Date(tripStartTime).getTime();
    } else {
      return "Other";
    }

    const actualTripDays = actualTripTime / (1000 * 60 * 60 * 24);

    return etaDays >= actualTripDays ? "On Time" : "Delayed";
  };

  // Custom sorting logic for Trip Status and TAT Status
  const currentData = tripData
    .sort((a, b) => {
      const order = sortDirection === 'asc' ? 1 : -1;

      // Sort by trip status
      if (sortColumn === 'tripStatus') {
        const statusOrder = ['Delivered', 'In Transit', 'Booked']; // Example order
        return order * (statusOrder.indexOf(a.currenStatus) - statusOrder.indexOf(b.currenStatus));
      }

      // Sort by TAT status
      if (sortColumn === 'tatStatus') {
        const tatA = TAT(a);
        const tatB = TAT(b);
        const tatOrder = ['On Time', 'Other', 'Delayed']; // Sort "On Time" first
        return order * (tatOrder.indexOf(tatA) - tatOrder.indexOf(tatB));
      }

      // Default sorting for other columns
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

  useEffect(() => {
    setSelectedTrips(tripData.filter((trip) => selectedRows.includes(trip.tripId)));
  }, [selectedRows, tripData]);

  // Handle Add Trip
  const handleAddTrip = async (formState: TripForm) => {
    const newTrip: Trip = {
      id: crypto.randomUUID(),
      tripId: formState.tripId,
      transporter: formState.transporter,
      tripStartTime: new Date().toISOString(),
      currentStatusCode: "BKD",
      currenStatus: "Booked",
      phoneNumber: formState.phone,
      etaDays: 0,
      distanceRemaining: 0,
      tripEndTime: "",
      source: formState.source,
      sourceLatitude: 0,
      sourceLongitude: 0,
      dest: formState.destination,
      destLatitude: 0,
      destLongitude: 0,
      lastPingTime: "",
      createdAt: new Date().toISOString(),
    };

    setTripData((prevTrips) => [...prevTrips, newTrip]);
    setIsAddDialogOpen(false);

    try {
      await addTripToDatabase(newTrip);
    } catch (error) {
      console.error("Failed to add trip to database:", error);
    }
  };

  const handleUpdateTrip = async (formState: UpdateTripForm[]) => {
    try {
      // Iterate through the selected trips and update each one in the database
      for (let index = 0; index < selectedTrips.length; index++) {
        const trip = selectedTrips[index];
        const updatedData = formState[index];

        // Call the updateTripToDatabase action to update the database
        await updateTripToDatabase(trip.tripId, {
          transporter: updatedData.transporter,
          tripStartTime: updatedData.time?.toISOString(),
        });
      }

      // Update the frontend state after successfully updating the database
      const updatedTrips = tripData.map((trip, index) =>
        selectedRows.includes(trip.tripId)
          ? {
              ...trip,
              transporter: formState[index].transporter,
              tripStartTime: formState[index].time?.toISOString() || trip.tripStartTime,
            }
          : trip
      );

      setTripData(updatedTrips);
      setIsUpdateDialogOpen(false);
      setSelectedTrips([]);
    } catch (error) {
      console.error("Failed to update trip in the database:", error);
    }
  };

  const openUpdateDialog = () => {
    setIsUpdateDialogOpen(true);
  };

  const handleColumnClick = (column: keyof Trip | 'tripStatus' | 'tatStatus') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
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
              onClick={openUpdateDialog}
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
            onClick={() => setIsAddDialogOpen(true)}
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
                <Checkbox
                  color="primary"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick('tripId')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'bold', // Makes the column header bold
                }}
              >
                Trip id
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick('transporter')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'bold', // Makes the column header bold
                }}
              >
                Transporter
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick('source')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'bold', // Makes the column header bold
                }}
              >
                Source
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick('dest')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'bold', // Makes the column header bold
                }}
              >
                Destination
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick('phoneNumber')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'bold', // Makes the column header bold
                }}
              >
                Phone
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick('etaDays')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'bold', // Makes the column header bold
                }}
              >
                ETA
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick('distanceRemaining')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'bold', // Makes the column header bold
                }}
              >
                Distance remaining
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick('tripStatus')} // Sortable Trip Status
                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
              >
                Trip status
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick('tatStatus')} // Sortable TAT Status
                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
              >
                TAT status
              </TableCell>
            </TableRow>
          </TableHead>

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
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: 'bold', // Makes the Trip id bold in the body
                  }}
                >
                  {row.tripId}
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.transporter}
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.source}
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.dest}
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
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

      <AddTripDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddTrip}
      />

      {selectedTrips.length > 0 && (
        <UpdateTripDialog
          open={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
          onSubmit={handleUpdateTrip}
          trips={selectedTrips}
        />
      )}
    </Paper>
  );
};

export default TripListTable2;
