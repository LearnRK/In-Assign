import { Pagination, PaginationItem } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React from "react";

interface PaginationProps {
  count: number;      // Total number of pages
  page: number;       // Current page
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({ count, page, onChange }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
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
  );
};

export default CustomPagination;
