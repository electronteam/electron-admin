import React, {Component} from 'react';
import {properties} from '../../properties.js';
import {Redirect} from 'react-router-dom';

class ProductsView extends Component {
    constructor()
    {
        super();
        this.state = {
            products: [],
            toProductDetails: false,
            selectedProductId: ''
        };
    }

    componentDidMount()
    {
        let api = properties.api.products;
        // Read the token from the session storage // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");

        fetch(api, {headers: {'Authorization': token} })
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        products: response
                    });
                })
                .catch(error => {
                    console.log(error);
                });
    }

    viewProductDetails(productId)
    {
        this.setState(() => ({toProductDetails: true, selectedProductId: productId}));
    }

    render()
    {
        if (this.state.toProductDetails === true)
        {
            return <Redirect to={{
                pathname: properties.productDetails.path + this.state.selectedProductId,
            }}/>
        }

        return (
                <div className="container text-center">
                    {this.state.products.length > 0 ?
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">{properties.productsView.id}</th>
                                    <th scope="col" className="text-left">{properties.productsView.name}</th>
                                    <th scope="col" className="text-left">{properties.productsView.price}</th>
                                    <th scope="col" className="text-center">{properties.productsView.action}</th>

                                </tr>
                                </thead>
                                <tbody>
                                {this.state.products.map((product, index) => {
                                    return (
                                            <tr key={index}>
                                                <th scope="row">{product.code}</th>
                                                <td className="text-left">{product.name}</td>
                                                <td className="text-left">{product.price}</td>
                                                <td className="text-center">
                                                    <button type="button" className="button generic_button"
                                                            onClick={() => this.viewProductDetails(product.code)}>
                                                        {properties.productsView.viewDetails}
                                                    </button>
                                                </td>
                                            </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            :
                            <h1>{properties.productsView.noProductsDisplayText}</h1>
                    }
                </div>
        );
    }
}

export default ProductsView;