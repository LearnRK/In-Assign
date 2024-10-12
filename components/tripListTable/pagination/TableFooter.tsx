import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, Pagination, PaginationItem, SelectChangeEvent } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface CustomFooterProps {
  totalRecords: number;
  rowsPerPageOptions: number[];
  currentPage: number;
  totalPages: number;
  onRowsPerPageChange: (value: number) => void;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const TableFooter: React.FC<CustomFooterProps> = ({
  totalRecords,
  rowsPerPageOptions,
  currentPage,
  totalPages,
  onRowsPerPageChange,
  onPageChange,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[0]);

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number;
    setRowsPerPage(value);
    onRowsPerPageChange(value);
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 20px",
        gap: "16px",
        width: "100%",
        height: "40px",
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E0E0E0",
        borderRadius: "0px 0px 8px 8px",
      }}
    >
      {/* Left Side: Showing Records */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography fontSize="12px" fontWeight={400} color="#1A1A1A">
          Viewing {rowsPerPage * (currentPage - 1) + 1}-
          {Math.min(rowsPerPage * currentPage, totalRecords)} of {totalRecords} records
        </Typography>
        <Typography fontSize="12px" fontWeight={400} color="#1A1A1A">
          Rows per page:
        </Typography>
        <Select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          sx={{ height: "24px", width: "56px", fontSize: "12px" }}
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Right Side: Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
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
  );
};

export default TableFooter;
