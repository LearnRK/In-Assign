"use client";

import React, { useState } from "react";
import { Paper, Table, TableBody, TableContainer, TableHead, Box } from "@mui/material";
import { Trip } from "../GetData";
import TableHeader from "./TableHeader";
import ColumnName from "./ColumnName";
import TableRows from "./TableRows";
import PaginationWithDetails from "./PaginationWithDetails";
import TableFooter from "../pagination/TableFooter";

interface TripListTableProps {
  trips: Trip[];
}

const TripListTable: React.FC<TripListTableProps> = ({ trips }) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const totalRecords = trips.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const currentData = trips.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Paper
      elevation={0}
      sx={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px 24px',
        width: '100%', // Match the desired width
        height: '532px', // Match the desired height
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        flexGrow: 0, // Prevent the component from growing
        overflow: 'hidden', // Ensure the content doesn't overflow
      }}
    >
      {/* Table Header */}
      <TableHeader />

      {/* Table with scrolling rows and static column headers */}
      <TableContainer
        sx={{
          flexGrow: 1,
          maxHeight: "calc(100vh - 350px)", // Adjust based on your layout
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Table stickyHeader>
          {/* Column Names */}
          <TableHead>
            <ColumnName />
          </TableHead>

          {/* Table Rows */}
          <TableBody>
            {currentData.map((row) => (
              <TableRows key={row.tripId} row={row} />
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
        }}
      >
        <TableFooter
          totalRecords={totalRecords}
          rowsPerPageOptions={[10, 20, 30, 50]}
          currentPage={page} // Updated to use dynamic page state
          totalPages={totalPages}
          onRowsPerPageChange={handleRowsPerPageChange}
          onPageChange={handleChangePage} // Updated to use dynamic page change handler
        />
      </Box>
    </Paper>
  );
};

export default TripListTable;
