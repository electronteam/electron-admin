import React, {Component} from 'react';
import {properties} from '../../properties.js';
import {withTranslation} from 'react-i18next';
import Paper from "@material-ui/core/Paper/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import EnhancedTableHead from "./../EnhancedTableHead";
import CustomButtonGroup from "./../CustomButtonGroup";
import TablePagination from "@material-ui/core/TablePagination";
import withStyles from "@material-ui/core/styles/withStyles";

const defaultFetchOffset = 0;
const defaultFetchLimit = 5;

const useStyles = () => ({
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
});

const headCells = [
    {id: 'ID', numeric: false, disablePadding: false, label: 'usersView.id'},
    {id: 'First Name', numeric: false, disablePadding: false, label: 'usersView.name'},
    {id: 'Last Name', numeric: false, disablePadding: false, label: 'usersView.lastName'},
    {id: 'Email', numeric: false, disablePadding: false, label: 'usersView.email'},
    {id: 'Phone', numeric: false, disablePadding: false, label: 'usersView.phone'},
    {id: 'Role', numeric: false, disablePadding: false, label: 'usersView.role'},
];

class UsersView extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            users: [],
            totalRows: 0,
            page: defaultFetchOffset,
            rowsPerPage: defaultFetchLimit
        };
    }

    componentDidMount()
    {
        this.getUsers();
    }

    componentDidUpdate()
    {
        this.getUsers();
    }

    getUsers()
    {
        let api = properties.api.users + `?page=${this.state.page}&size=${this.state.rowsPerPage}`;
        // Read the token from the session storage // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");

        fetch(api, {headers: {'Authorization': token}})
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        users: response.content,
                        totalRows: response.totalElements
                    });
                })
                .catch(error => {
                    console.log(error);
                });
    }

    handleChangeRowsPerPage(event)
    {
        const limit = parseInt(event.target.value, 10)
        this.setState(() => ({rowsPerPage: limit}));
    };

    handleChangePage(event, newPage)
    {
        this.setState(() => ({page: newPage}));
    };

    render()
    {
        const {classes} = this.props;

        return (
                <div className="container text-center">
                    {this.state.users.length > 0 ?
                            <Paper className={classes.paper}>
                                <TableContainer>
                                    <Table aria-label="customized table">
                                        <EnhancedTableHead
                                                headCells={headCells}
                                                classes={classes}
                                                order={this.props.order}
                                                orderBy={this.props.orderBy}
                                                onRequestSort={this.props.onRequestSort}/>
                                        <TableBody>
                                            {this.state.users.map((user, index) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell>{user.id}</TableCell>
                                                        <TableCell>{user.name}</TableCell>
                                                        <TableCell>{user.lastName}</TableCell>
                                                        <TableCell>{user.email}</TableCell>
                                                        <TableCell>{user.phone}</TableCell>
                                                        <TableCell>{user.role}</TableCell>
                                                        <TableCell>
                                                            <CustomButtonGroup
                                                                    row={user}
                                                                    index={index}
                                                                    type="user"
                                                                    selectedID={user.id}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                        rowsPerPageOptions={[1, 2, 4, 5, 10]}
                                        component="div"
                                        count={this.state.totalRows}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={(event, newPage) => this.handleChangePage(event, newPage)}
                                        onChangeRowsPerPage={(event) => this.handleChangeRowsPerPage(event)}
                                />
                            </Paper>
                            :
                            <h1>{this.props.t('usersView.noUserDisplayText')}</h1>
                    }
                </div>
        );
    }
}

export default withTranslation()(withStyles(useStyles)(UsersView));