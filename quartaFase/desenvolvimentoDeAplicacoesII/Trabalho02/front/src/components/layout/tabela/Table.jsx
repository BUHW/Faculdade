import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from "react";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handlePageChange = (event, direction) => {
        const newPage =
            direction === 'next'
                ? page + 1
                : direction === 'prev'
                    ? page - 1
                    : direction === 'first'
                        ? 0
                        : Math.max(0, Math.ceil(count / rowsPerPage) - 1);

        onPageChange(event, newPage);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={(event) => handlePageChange(event, 'first')}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={(event) => handlePageChange(event, 'prev')}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={(event) => handlePageChange(event, 'next')}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={(event) => handlePageChange(event, 'last')}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

export default function TableList({ columns, rows, loading }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filter, setFilter] = useState('');

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value.toLowerCase());
    };

    const getDisplayValue = (value) => {
        return value === null || value === '' || value === undefined ? '-' : value;
    };

    const filteredRows = rows.filter(row =>
        columns.some(col =>
            getDisplayValue(row[col.field]).toLowerCase().includes(filter)
        )
    );

    return (
        <TableContainer component={Paper}>
            <TextField
                label="Filtrar"
                value={filter}
                onChange={handleFilterChange}
                variant="standard"
            />
            <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.field} align={column.align || "left"}>
                                {column.headerName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        Array.from(new Array(5)).map((_, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.field}>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        (rowsPerPage > 0
                            ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredRows
                        ).map((row, rowIndex) => (
                            <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {columns.map((column, colIndex) => (
                                    <TableCell
                                        key={column.field}
                                        align={column.align || "left"}
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: 150,
                                        }}
                                    >
                                        {colIndex === columns.length - 1 ? (
                                            column.render ? column.render(row) : getDisplayValue(row[column.field])
                                        ) : (
                                            <Tooltip title={column.render ? column.render(row) : getDisplayValue(row[column.field])}>
                                                <span>
                                                    {column.render ? column.render(row) : getDisplayValue(row[column.field])}
                                                </span>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={columns.length} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={columns.length}
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        'aria-label': 'Linhas por página',
                                    },
                                    native: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
