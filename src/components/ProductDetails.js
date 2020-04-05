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
                            <div>
                                <h2>Detaliile produsului - {this.state.product.name}</h2>

                                <form method="POST" encType="multipart/form-data" action={properties.api.uploadProductImage + this.state.product.code}>
                                    <table>
                                        <tr>
                                            <td>File to upload:</td>
                                            <td><input type="file" name="file"/></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><input type="submit" value="Upload"/></td>
                                        </tr>
                                    </table>
                                </form>
                            </div>
                            :
                            <h2>{properties.productDetails.productNotFoundDisplayText}</h2>
                    }
                </div>
        )
    }
}

export default ProductDetails;