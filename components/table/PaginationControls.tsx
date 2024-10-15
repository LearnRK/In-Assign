// components/table/PaginationControls.tsx
import React from 'react';
import { Box, Typography, Select, MenuItem, Pagination, PaginationItem } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface PaginationControlsProps {
  page: number;
  rowsPerPage: number;
  totalRecords: number;
  handleChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  handleRowsPerPageChange: (event: any) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  rowsPerPage,
  totalRecords,
  handleChangePage,
  handleRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", backgroundColor: "#FFFFFF", borderTop: "1px solid #E0E0E0", pt: "10px", pb: "24px", paddingX: "24px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography fontSize="12px" fontWeight={400} color="#1A1A1A">Viewing {rowsPerPage * (page - 1) + 1}-{" "} {Math.min(rowsPerPage * page, totalRecords)} of {totalRecords} records</Typography>
        <Typography fontSize="12px" fontWeight={400} color="#1A1A1A">Rows per page:</Typography>
        <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ height: "24px", width: "60px", fontSize: "12px" }}>
          {[10, 20, 30, 50].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
        </Select>
      </Box>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
        size="small"
        renderItem={(item) => (
          <PaginationItem {...item} components={{ previous: ArrowBackIos, next: ArrowForwardIos }} sx={{ "&.Mui-selected": { backgroundColor: "#0057D1", color: "#FFFFFF" } }} />
        )}
      />
    </Box>
  );
};

export default PaginationControls;
