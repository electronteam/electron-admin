import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ProductImage from "./ProductImage";
import '../../styles/productdetails.css';
import { withTranslation } from 'react-i18next';

class ProductDetails extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            productId: '',
            product: null,
            imageURL: null,
            code: '',
            name: '',
            description: '',
            price: 0.00
        };
        this.reloadImage = this.reloadImage.bind(this);
    }

    inputsChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    updateProduct(callback)
    {
        let api = process.env.REACT_APP_UPDATE_PRODUCT;
        const token = sessionStorage.getItem("jwt");

        let formData = new FormData();
        let code = this.state.code;
        let name = this.state.name;
        let description = this.state.description;
        let price = this.state.price;
        formData.append('code', code);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);

        fetch(api, {
            method: 'post',
            headers: {'Authorization': token},
            body: formData
        }).then(function (response) {
            callback(code);
        })
    }

    componentDidMount()
    {
        const {match: {params}} = this.props;
        let productId = params.productId;

        this.getProductDetails(productId)
    }

    getProductDetails(productId)
    {
        let api = process.env.REACT_APP_PRODUCT_BY_CODE + "/" + productId;
        const token = sessionStorage.getItem("jwt");

        fetch(api, {headers: {'Authorization': token}})
                .then(response => response.json())
                .then(response => {
                    // order = response
                    this.setState({
                        product: response,
                        code: response.code,
                        name: response.name,
                        description: response.description,
                        price: response.price,
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
        let api = process.env.REACT_APP_PRODUCT_IMAGE + "/" + this.state.product.code;

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
        let api = process.env.REACT_APP_UPLOAD_PRODUCT_IMAGE + this.state.product.code;

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
                                                    {this.props.t('productDetails.uploadProductImage')}
                                                </Button>
                                            </label>
                                        </div>
                                        <div className="col-lg-7">
                                            <div className="product_description">
                                                <div className="edit_form_fields">
                                                    <div className="edit_form_container">
                                                        <div className="form-group row">
                                                            <label htmlFor="name" className="col-sm-2 col-form-label">{this.props.t('createProduct.id')}</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="create_form_input" size="30"
                                                                       id="code"
                                                                       name="code"
                                                                       readOnly={true}
                                                                       value={this.state.product.code}
                                                                       onChange={this.inputsChangeHandler}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="lastName"
                                                                   className="col-sm-2 col-form-label">{this.props.t('createProduct.name')}</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="create_form_input" size="30"
                                                                       id="name"
                                                                       name="name"
                                                                       required="required"
                                                                       defaultValue={this.state.product.name}
                                                                       onChange={this.inputsChangeHandler}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="email"
                                                                   className="col-sm-2 col-form-label">{this.props.t('createProduct.description')}</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="create_form_input" size="30"
                                                                       id="description"
                                                                       name="description"
                                                                       required="required"
                                                                       defaultValue={this.state.product.description}
                                                                       onChange={this.inputsChangeHandler}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="address"
                                                                   className="col-sm-2 col-form-label">{this.props.t('createProduct.price')}</label>
                                                            <div className="col-sm-10">
                                                                <input type="number" step="0.01" min="0" className="create_form_price_input"
                                                                       id="price"
                                                                       name="price"
                                                                       required="required"
                                                                       defaultValue={this.state.product.price}
                                                                       onChange={this.inputsChangeHandler}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="button_container">
                                                <button type="button" className="button generic_button"
                                                        onClick={() => this.updateProduct(this.getProductDetails)}>
                                                    {this.props.t('buttons.save')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <h2>{this.props.t('productDetails.productNotFoundDisplayText')}</h2>
                    }
                </div>
        )
    }
}

export default withTranslation()(ProductDetails);