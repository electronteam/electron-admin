import React, {Component} from 'react';
import {properties} from "../properties";

class ProductDetails extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            productId: '',
            product: null
        };
    }

    componentDidMount()
    {
        const {match: {params}} = this.props;
        let productId = params.productId;
        let api = properties.api.productByCode + "/" + productId;
        const token = sessionStorage.getItem("jwt");
        let product = {};

        fetch(api, {headers: {'Authorization': token}})
                .then(response => response.json())
                .then(response => {
                    console.log("Response: " + response)
                    // order = response
                    this.setState({
                        product: response
                    });
                })
                .catch(error => {
                    console.log(error);
                });

        console.log(product);
    }

    render()
    {
        return (
                <div className="container text-center">
                    {this.state.product ?
                            <h2>Detaliile produsului - {this.state.product.name}</h2>
                            :
                            <h2>{properties.productDetails.productNotFoundDisplayText}</h2>
                    }
                </div>
        )
    }
}

export default ProductDetails;