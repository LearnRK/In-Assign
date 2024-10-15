"use client";

import React, { useState, useEffect } from "react";
import { Paper, TableContainer, SelectChangeEvent, Snackbar, Alert } from "@mui/material";
import AddTripDialog from "../addTrip/AddTrip";
import UpdateTripDialog from "../addTrip/UpdateTrip";
import { addTripToDatabase } from "@/app/actions/AddTrip";
import { updateTripToDatabase } from "@/app/actions/UpdateTrip";
import { fetchTripsFromDB } from "@/app/actions/GetData";
import { deleteTripsFromDatabase } from "@/app/actions/DeleteTrip2";
import TableBodyContainer from "../table/TableBodyContainer";
import TablePagination from "../table/TablePagination";
import { Trip, TripForm, UpdateTripForm } from "@/types/tripTypes";
import TableHeader2 from "../tableV2/TableHeader2";

export interface TripListTableProps {
  trips: Trip[];
}

const TripListTable2: React.FC<TripListTableProps> = ({ trips }) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [tripData, setTripData] = useState<Trip[]>(() => [...trips]);
  const [selectedTrips, setSelectedTrips] = useState<Trip[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<keyof Trip | 'tripStatus' | 'tatStatus'>('tripStatus');

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");


  const totalRecords = tripData.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

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

  const currentData = [...tripData] // Create shallow copy before sorting
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
      prevSelected.includes(tripId) ? prevSelected.filter((id) => id !== tripId) : [...prevSelected, tripId]
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

  const refetchTrips = async () => {
    try {
      const fetchedTrips = await fetchTripsFromDB(); // Fetch updated trips from the backend
      setTripData(fetchedTrips);
    } catch (error) {
      console.error("Failed to refetch trips:", error);
    }
  };

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
  
    setTripData((prevTrips) => [...prevTrips, newTrip]); // Add the new trip properly
    setIsAddDialogOpen(false);
  
    try {
      await addTripToDatabase(newTrip);
      setSnackbarMessage("Trip added successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Failed to add trip to database:", error);
      setSnackbarMessage("Failed to add trip!");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };
  
  const handleUpdateTrip = async (formState: UpdateTripForm[]) => {
    try {
      for (let index = 0; index < selectedTrips.length; index++) {
        const trip = selectedTrips[index];
        const updatedData = formState[index];
  
        await updateTripToDatabase(trip.tripId, {
          transporter: updatedData.transporter,
          tripStartTime: updatedData.time?.toISOString(),
        });
      }
  
      const updatedTrips = tripData.map((trip) =>
        selectedRows.includes(trip.tripId)
          ? {
              ...trip,
              transporter: formState.find((item) => item.transporter)?.transporter || trip.transporter,
              tripStartTime: formState.find((item) => item.time)?.time?.toISOString() || trip.tripStartTime,
            }
          : trip
      );
  
      setTripData(updatedTrips);
      setIsUpdateDialogOpen(false);
      setSelectedTrips([]);
  
      setSnackbarMessage("Trip updated successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Failed to update trip in the database:", error);
      setSnackbarMessage("Failed to update trip!");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true); 
  };
  
  
  const handleDeleteTrips = async () => {
    if (selectedRows.length > 0) {
      try {
        await deleteTripsFromDatabase(selectedRows);
        setSnackbarMessage(`${selectedRows.length} trip(s) deleted successfully!`); 
        setSnackbarSeverity("success");
        setSnackbarOpen(true); 
        await refetchTrips();
        setSelectedRows([]);
      } catch (error) {
        console.error("Error deleting selected trips:", error);
        setSnackbarMessage("Failed to delete trips!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };
  

  const openUpdateDialog = () => {
    setIsUpdateDialogOpen(true);
  };

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleColumnClick = (column: keyof Trip | "tripStatus" | "tatStatus") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        height: "calc(100vh)",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <TableHeader2
        selectedRows={selectedRows}
        openAddDialog={openAddDialog}
        openUpdateDialog={openUpdateDialog}
        onTripsDeleted={handleDeleteTrips}
      />

      <TableContainer sx={{ flexGrow: 1, maxHeight: "calc(100vh - 360px)", overflowY: "auto" }}>
        <TableBodyContainer
          currentData={currentData}
          selectedRows={selectedRows}
          handleRowSelect={handleRowSelect}
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          handleColumnClick={handleColumnClick}
          TAT={TAT}
        />
      </TableContainer>

      <TablePagination
        page={page}
        rowsPerPage={rowsPerPage}
        totalRecords={totalRecords}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Pass existingTrips to AddTripDialog */}
      <AddTripDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddTrip}
        existingTrips={tripData.map((trip) => ({
          tripId: trip.tripId,
          transporter: trip.transporter,
          source: trip.source,
          destination: trip.dest,
          phone: trip.phoneNumber,
        }))}
      />

      {selectedTrips.length > 0 && (
        <UpdateTripDialog
          open={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
          onSubmit={handleUpdateTrip}
          trips={selectedTrips}
        />
      )}

      {/* Snackbar for showing success/failure messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Paper>
  );
};

export default TripListTable2;
  