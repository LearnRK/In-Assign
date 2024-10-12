import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface PaginationProps {
  totalRecords: number;
  rowsPerPageOptions: number[];
}

const PaginationComponent1: React.FC<PaginationProps> = ({ totalRecords, rowsPerPageOptions }) => {
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(event.target.value as number);
  };

  const getRange = () => {
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, totalRecords);
    return `${start}-${end}`;
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" padding={0} margin="0 auto" width="319px" height="24px">
      {/* Left side with record range */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography style={{ fontFamily: 'Source Sans Pro', fontSize: 12, fontWeight: 400, color: '#1A1A1A' }}>
          Viewing
        </Typography>
        <Typography style={{ fontFamily: 'Poppins', fontSize: 11, fontWeight: 500, color: '#1A1A1A' }}>
          {getRange()}
        </Typography>
        <Typography style={{ fontFamily: 'Source Sans Pro', fontSize: 12, fontWeight: 400, color: '#1A1A1A' }}>
          of
        </Typography>
        <Typography style={{ fontFamily: 'Poppins', fontSize: 11, fontWeight: 500, color: '#1A1A1A' }}>
          {totalRecords}
        </Typography>
        <Typography style={{ fontFamily: 'Source Sans Pro', fontSize: 12, fontWeight: 400, color: '#1A1A1A' }}>
          records
        </Typography>
      </Box>

      {/* Right side with rows per page selection */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography style={{ fontFamily: 'Source Sans Pro', fontSize: 12, fontWeight: 400, color: '#1A1A1A' }}>
          Rows per page:
        </Typography>
        <Select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          variant="outlined"
          style={{ height: '24px', width: '56px', border: '1px solid #E0E0E0', borderRadius: '4px' }}
        >
          {rowsPerPageOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default PaginationComponent1;
