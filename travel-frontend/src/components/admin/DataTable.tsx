import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import TablePaginationComponent from "../admin/Pagination";

interface Column<T> {
    label: string;
    key?: keyof T;
    isImage?: boolean;
    render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    page: number;
    rowsPerPage: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DataTable = <T extends { _id: string }>({
    data,
    columns,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange
}: DataTableProps<T>) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                        <TableRow key={item._id}>
                            {columns.map((column, index) => (
                                <TableCell key={index}>
                                    {column.render ? column.render(item) : (column.key ? item[column.key] as string | number : '')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Tách riêng pagination */}
            <TablePaginationComponent
                count={data.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </TableContainer>
    );
};

export default DataTable;
