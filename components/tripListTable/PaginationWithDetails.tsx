import React from 'react';
import { Box, Typography, Select, MenuItem, FormControl } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { CustomPagination2 } from './CustomPagination2';
import CustomPagination from './CustomPagination';

interface PaginationWithDetailsProps {
  totalPages: number;
  currentPage: number;
  totalRecords: number;
  rowsPerPage: number;
  onRowsPerPageChange: (event: SelectChangeEvent<number>) => void;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationWithDetails: React.FC<PaginationWithDetailsProps> = ({
  totalPages,
  currentPage,
  totalRecords,
  rowsPerPage,
  onRowsPerPageChange,
  onPageChange
}) => {
  const fromRecord = (currentPage - 1) * rowsPerPage + 1;
  const toRecord = Math.min(currentPage * rowsPerPage, totalRecords);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="body2" color="textSecondary">
          Viewing {fromRecord}-{toRecord} of {totalRecords} records
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', pl: 6 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
            Rows per page:
          </Typography>
          <FormControl variant="outlined" size="small">
            <Select
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
              sx={{ width: '72px' }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <CustomPagination
        totalPages={totalPages}
        page={currentPage}
        onPageChange={onPageChange}
      />
    </Box>
  );
};

export default PaginationWithDetails;
