import React, {Component} from "react";
import {properties} from '../../properties.js';
import {Redirect} from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class CreateProduct extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            code: '',
            name: '',
            description: '',
            price: 0.00,
            toProductDetails: false
        };
        this.goToProductDetails = this.goToProductDetails.bind(this);
    }

    inputsChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    saveProduct(callback)
    {
        let api = properties.api.createProduct;
        const token = sessionStorage.getItem("jwt");

        let formData = new FormData();
        formData.append('code', this.state.code);
        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('price', this.state.price);

        fetch(api, {
            method: 'post',
            headers: {'Authorization': token},
            body: formData
        }).then(function (response) {
            callback();
        })
    }

    goToProductDetails()
    {
        this.setState(() => ({toProductDetails: true}));
    }

    render()
    {
        if (this.state.toProductDetails === true) {
            return <Redirect to={properties.productDetails.path + this.state.code} />
        }

        return (
                <div className="container text-center create_form">
                    <div className="row justify-content-center">
                        <div className="create_form_fields">
                            <div className="create_form_title">{this.props.t('createProduct.title')}</div>
                            <div className="create_form_container">
                                <div className="form-group row">
                                    <label htmlFor="name" className="col-sm-2 col-form-label">{this.props.t('createProduct.id')}</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="create_form_input" size="30"
                                               id="code"
                                               name="code"
                                               required="required"
                                               onChange={this.inputsChangeHandler}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="lastName" className="col-sm-2 col-form-label">{this.props.t('createProduct.name')}</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="create_form_input" size="30"
                                               id="name"
                                               name="name"
                                               required="required"
                                               onChange={this.inputsChangeHandler}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="email" className="col-sm-2 col-form-label">{this.props.t('createProduct.description')}</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="create_form_input" size="30"
                                               id="description"
                                               name="description"
                                               required="required"
                                               onChange={this.inputsChangeHandler}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="address" className="col-sm-2 col-form-label">{this.props.t('createProduct.price')}</label>
                                    <div className="col-sm-10">
                                        <input type="number" step="0.01" min="0" className="create_form_price_input"
                                               id="price"
                                               name="price"
                                               required="required"
                                               onChange={this.inputsChangeHandler}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="button_container">
                        <button type="button" className="button generic_button"
                                onClick={() => this.saveProduct(this.goToProductDetails)}>
                            {this.props.t('buttons.save')}
                        </button>
                    </div>
                </div>
        )
    }
}

export default withTranslation()(CreateProduct);