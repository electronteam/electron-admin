import React, {useState, useEffect} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Container} from "@material-ui/core";
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {properties} from "../../properties";
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import CustomButtonGroup from "../CustomButtonGroup";
import EnhancedTableHead from "../EnhancedTableHead";

const defaultFetchOffset = 0;
const defaultFetchLimit = 5;

export const useStyles = makeStyles(() =>
        createStyles({
            visuallyHidden: {
                border: 0,
                clip: 'rect(0 0 0 0)',
                height: 1,
                margin: -1,
                overflow: 'hidden',
                padding: 0,
                position: 'absolute',
                top: 20,
                width: 1,
            },
        }),
);

const headCells = [
    {id: 'ID', numeric: false, disablePadding: false, label: 'ordersView.id'},
    {id: 'First Name', numeric: false, disablePadding: false, label: 'ordersView.firstName'},
    {id: 'Last Name', numeric: false, disablePadding: false, label: 'ordersView.lastName'},
    {id: 'Total Price', numeric: false, disablePadding: false, label: 'ordersView.totalPrice'},

];

const OrdersView = (props) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(defaultFetchOffset);
    const [rowsPerPage, setRowsPerPage] = React.useState(defaultFetchLimit);
    const [orders, setOrders] = React.useState([]);
    const [totalRows, setTotalRows] = useState(0);


    const handleChangeRowsPerPage = (event) => {
        const limit = parseInt(event.target.value, 10)
        console.log('LIMIT: ', limit);
        setPage(0);
        setRowsPerPage(limit);

        console.log('limit params: ', limit);
        console.log('offset params: ', page);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        console.log('USE EFFECT');
        let api = properties.api.allOrders;
        // Read the token from the session storage // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");

        fetch(`http://localhost:8080/api/admin/orders?page=${page}&size=${rowsPerPage}`, {headers: {'Authorization': token}})
                .then(response => response.json())
                .then(response => {
                    console.log('THEN BLOCK ', response.content);
                    setOrders(response.content);
                    setTotalRows(response.totalElements);
                })
                .catch(error => {
                    console.log('ERROR: ', error);
                });
    }, [page, rowsPerPage]);


    return (
            <Container maxWidth={"lg"}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table aria-label="customized table">
                            <EnhancedTableHead
                                    headCells={headCells}
                                    classes={classes}
                                    order={props.order}
                                    orderBy={props.orderBy}
                                    onRequestSort={props.onRequestSort}/>
                            <TableBody>
                                {orders.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.userName}</TableCell>
                                            <TableCell>{row.userLastName}</TableCell>
                                            <TableCell>{row.totalPrice}</TableCell>
                                            <TableCell>
                                                <CustomButtonGroup
                                                        row={row}
                                                        index={index}
                                                        type="order"
                                                        selectedID={row.id}
                                                />
                                            </TableCell>
                                        </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                            rowsPerPageOptions={[1, 5, 10]}
                            component="div"
                            count={totalRows}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
    )
};

export default OrdersView;
