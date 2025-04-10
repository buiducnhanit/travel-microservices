import React from "react";
import { TablePagination } from "@mui/material";

interface PaginationProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    count,
    page,
    rowsPerPage, 
    onPageChange,
    onRowsPerPageChange
}) => {
    return (
        <TablePagination
            component="div"
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        />
    );
};

export default Pagination;
