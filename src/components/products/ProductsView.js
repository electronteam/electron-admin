import React, {Component} from 'react';
import {properties} from '../../properties.js';
import Paper from "@material-ui/core/Paper/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import EnhancedTableHead from "../EnhancedTableHead";
import {Table, TableBody, TableCell, TableRow, Fab} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import CustomButtonGroup from "../CustomButtonGroup";
import TablePagination from "@material-ui/core/TablePagination";
import AddIcon from "@material-ui/icons/Add";
import {Link} from "react-router-dom";
import { withTranslation } from 'react-i18next';

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
    {id: 'ID', numeric: false, disablePadding: false, label: 'productsView.id'},
    {id: 'Name', numeric: false, disablePadding: false, label: 'productsView.name'},
    {id: 'Price', numeric: false, disablePadding: false, label: 'productsView.price'}
];

class ProductsView extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            products: [],
            toProductDetails: false,
            selectedProductId: '',
            page: defaultFetchOffset,
            rowsPerPage: defaultFetchLimit,
            totalRows: 0
        }
    }

    componentDidMount()
    {
        this.getProducts();
    }

    componentDidUpdate()
    {
        this.getProducts();
    }

    getProducts()
    {
        let api = properties.api.products + `?page=${this.state.page}&size=${this.state.rowsPerPage}`;
        // Read the token from the session storage // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");

        fetch(api, {headers: {'Authorization': token}})
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        products: response.content,
                        totalRows: response.totalElements
                    });
                })
                .catch(error => {
                    console.log(error);
                });
    }

    handleChangePage(event, newPage)
    {
        this.setState(() => ({page: newPage}));
    };

    handleChangeRowsPerPage(event)
    {
        const limit = parseInt(event.target.value, 10)
        this.setState(() => ({rowsPerPage: limit}));
    };

    render()
    {
        const {classes} = this.props;

        return (
                <div className="container text-center">
                    <div className="text-right top-buttons">
                        <Fab color="primary" aria-label="Add" size={"medium"}>
                            <Link to={properties.createProduct.path} style={{textDecoration: 'none'}}>
                                <AddIcon fontSize="small"/>
                            </Link>
                        </Fab>
                    </div>
                    {this.state.products.length > 0 ?
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
                                            {this.state.products.map((product, index) => (
                                                    <TableRow key={product.code}>
                                                        <TableCell>{product.code}</TableCell>
                                                        <TableCell>{product.name}</TableCell>
                                                        <TableCell>{product.price}</TableCell>
                                                        <TableCell>
                                                            <CustomButtonGroup
                                                                    row={product}
                                                                    index={index}
                                                                    type="product"
                                                                    selectedID={product.code}
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
                            <h1>{this.props.t('productsView.noProductsDisplayText')}</h1>
                    }
                </div>
        );
    }
}

export default withTranslation()(withStyles(useStyles)(ProductsView));