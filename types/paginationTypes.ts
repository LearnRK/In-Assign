// types/paginationTypes.ts
export interface PaginationControlsProps {
    page: number;
    rowsPerPage: number;
    totalRecords: number;
    handleChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
    handleRowsPerPageChange: (event: any) => void;
}
