import React, {Component} from 'react';
import {properties} from '../properties.js';

class ProductsView extends Component {
    constructor()
    {
        super();
        this.state = {
            products: []
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

    render()
    {
        return (
                <div className="container text-center">
                    {this.state.products.length > 0 ?
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Code</th>
                                    <th scope="col" className="text-left">Name</th>
                                    <th scope="col" className="text-left">Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.products.map((product, index) => {
                                    return (
                                            <tr key={index}>
                                                <th scope="row">{product.code}</th>
                                                <td className="text-left">{product.name}</td>
                                                <td className="text-left">{product.price}</td>
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