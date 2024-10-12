import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const CustomPagination2: React.FC<PaginationProps> = ({ totalPages, page, onPageChange }) => {
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={onPageChange}
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          components={{
            first: FirstPageIcon,
            last: LastPageIcon,
            previous: NavigateBeforeIcon,
            next: NavigateNextIcon,
          }}
          {...item}
          sx={{
            margin: '0 2px',  // Reduce spacing between pagination items
            '&.Mui-selected': {
              backgroundColor: '#1976d2',
              color: '#fff',
            },
            '& .MuiPaginationItem-ellipsis': {
              margin: '0 4px',  // Adjust ellipsis spacing if needed
            },
            '& .MuiPaginationItem-icon': {
              color: '#1976d2',  // Set color for the icons (first, last, previous, next)
            },
            '&[aria-label="Go to previous page"], &[aria-label="Go to next page"], &[aria-label="Go to first page"], &[aria-label="Go to last page"]': {
              color: '#1976d2', // Set the color for all navigation buttons
            },
          }}
        />
      )}
      showFirstButton
      showLastButton
    />
  );
};
