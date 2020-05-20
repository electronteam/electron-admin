import React, {Component} from 'react';
import {properties} from "../../properties";
import Button from '@material-ui/core/Button';
import ProductImage from "./ProductImage";
import '../../styles/productdetails.css';

class ProductDetails extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            productId: '',
            product: null,
            imageURL: null,
        };
        this.reloadImage = this.reloadImage.bind(this);
    }

    componentDidMount()
    {
        const {match: {params}} = this.props;
        let productId = params.productId;

        this.getProductDetails(productId)
    }

    getProductDetails(productId)
    {
        let api = properties.api.productByCode + "/" + productId;
        const token = sessionStorage.getItem("jwt");

        fetch(api, {headers: {'Authorization': token}})
                .then(response => response.json())
                .then(response => {
                    // order = response
                    this.setState({
                        product: response,
                        imageURL: response.imageURL,
                        time: new Date().getTime()
                    });
                })
                .catch(error => {
                    console.log(error);
                });
    }

    reloadImage()
    {
        let api = properties.api.getProductImage + "/" + this.state.product.code;

        fetch(api)
                .then(response => response.text())
                .then(response => {
                    this.setState({
                        //added time at the end to ensure re-rendering for the case when product's imageURL string doesn't change
                        //(when setting the same value for the state, re-rendering doesn't happen)
                        imageURL: response + "?" + new Date().getTime()
                    });
                })
                .catch(error => {
                    console.log(error);
                });
    }

    uploadFile = (event, callback) => {
        var imagedata = event.target.files[0];
        var data = new FormData();
        data.append("file", imagedata);
        const token = sessionStorage.getItem("jwt");
        let api = properties.api.uploadProductImage + this.state.product.code;

        fetch(api, {
            mode: 'no-cors',
            method: "POST",
            headers: {'Authorization': token},
            body: data
        })
                .then(response => {
                    callback();
                })
                .catch(error => {
                    console.log(error);
                });
    }

    render()
    {
        return (
                <div className="container text-center">
                    {this.state.product ?
                            <div className="single_product">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-1"/>
                                        <div className="col-lg-5">
                                            <div id="productImage" className="image_selected">
                                                {this.state.imageURL ? <ProductImage imageURL={this.state.imageURL}/> : null}
                                            </div>
                                            <br/>
                                            <label htmlFor="upload-photo">
                                                <input
                                                        style={{display: 'none'}}
                                                        id="upload-photo"
                                                        name="upload-photo"
                                                        type="file"
                                                        onChange={event => this.uploadFile(event, this.reloadImage)}
                                                />

                                                <Button color={"primary"} variant="contained" component="span">
                                                    {properties.productDetails.uploadProductImage}
                                                </Button>
                                            </label>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="product_description">
                                                <div className="product_name">{this.state.product.name}</div>
                                                <div className="product_text"><p>{this.state.product.description}</p></div>
                                                <div className="product_price">{this.state.product.price} lei</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1"/>
                                    </div>
                                </div>
                            </div>
                            :
                            <h2>{properties.productDetails.productNotFoundDisplayText}</h2>
                    }
                </div>
        )
    }
}

export default ProductDetails;