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

    uploadFile()
    {
        var data = new FormData();
        var imagedata = document.querySelector('input[type="file"]').files[0];
        data.append("file", imagedata);
        const token = sessionStorage.getItem("jwt");
        let api = properties.api.uploadProductImage + this.state.product.code;

        fetch(api, {
            mode: 'no-cors',
            method: "POST",
            headers: {'Authorization': token},
            body: data
        }).then(function (res) {
            if (res.ok)
            {
                alert("Perfect! ");
            }
            else if (res.status == 401)
            {
                alert("Oops! ");
            }
        }, function (e) {
            alert("Error submitting form!");
        });
    }

    render()
    {
        return (
                <div className="container text-center">
                    {this.state.product ?
                            <div>
                                <h2>Detaliile produsului - {this.state.product.name}</h2>
                                    <table>
                                        <tr>
                                            <td>File to upload:</td>
                                            <td><input type="file" name="file"/></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <input type="button" value="Upload" onClick={this.uploadFile.bind(this)}/>
                                            </td>
                                        </tr>
                                    </table>
                            </div>
                            :
                            <h2>{properties.productDetails.productNotFoundDisplayText}</h2>
                    }
                </div>
        )
    }
}

export default ProductDetails;