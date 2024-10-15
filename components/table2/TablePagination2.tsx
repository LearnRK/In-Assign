import React from "react";
import { Box, Typography, Select, MenuItem, Pagination, PaginationItem, SelectChangeEvent } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface TablePaginationProps {
  page: number;
  rowsPerPage: number;
  totalRecords: number;
  totalPages: number;
  handleChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  handleRowsPerPageChange: (event: SelectChangeEvent<number>) => void;
}

const TablePagination2: React.FC<TablePaginationProps> = ({
  page,
  rowsPerPage,
  totalRecords,
  totalPages,
  handleChangePage,
  handleRowsPerPageChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E0E0E0",
        pt: "10px",
        pb: "20px",
        paddingX: "24px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography fontSize="14px" fontWeight={400} color="#1A1A1A">
          Viewing {rowsPerPage * (page - 1) + 1}-{" "}
          {Math.min(rowsPerPage * page, totalRecords)} of {totalRecords} records
        </Typography>
        <Typography fontSize="14px" fontWeight={400} color="#1A1A1A">
          Rows per page:
        </Typography>
        <Select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          sx={{ height: "24px", width: "64px", fontSize: "14px" }}
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
  );
};

export default TablePagination2;
