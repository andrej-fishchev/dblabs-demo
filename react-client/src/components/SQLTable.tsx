import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {ISQLTableHeader} from "../models/ISQLTableHeader";
import {Component} from "react";
import {ISQLNormalResponse} from '../models/ISQLResponse';
import {
    ISQLTableColumItem,
    ISQLTableRowItem,
    SQLTableRowMapListToRowItemList
} from "../models/ISQLTableRow";

type SQLTableProps  = {
    sqlResponse: ISQLNormalResponse;
}

type SQLTableStates = {
    page: number;
    rowsPerPage: number;
}

export class SQLTable extends Component<SQLTableProps, SQLTableStates> {

    constructor(props: SQLTableProps, states: SQLTableStates) {
        super(props, states);

        this.state = {
            page: 0,
            rowsPerPage: 10
        }
    }

    handleChangePage = (event: unknown, newPage: number) => {
        this.setState({
            page: newPage
        })
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            rowsPerPage: +event.target.value,
            page: 0
        })
    };

    render () {
        return <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '5%' }}>
            <TableContainer sx={{
                maxHeight: '100%',
                height: '50%'
            }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {this.props.sqlResponse.table_headers.map((header: ISQLTableHeader) => (
                                <TableCell
                                    key={header.id}
                                    align={'center'}
                                    style={{ minWidth: 'auto' }}
                                >
                                    {header.column_label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {SQLTableRowMapListToRowItemList(this.props.sqlResponse.table_rows)
                            .slice(this.state.page * this.state.rowsPerPage,
                                this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                            .map((row: ISQLTableRowItem) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {row.value.map((elem : ISQLTableColumItem) => {
                                            return (
                                                <TableCell key={elem.id} align={'center'}>
                                                    {elem.value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={this.props.sqlResponse.table_rows.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
        </Paper>
    }

}
