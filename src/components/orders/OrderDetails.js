import React, {Component} from 'react';
import '../../styles/orderdetails.css';
import {properties} from '../../properties.js';

class OrderDetails extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            orderId: '',
            order: null
        };
    }

    componentDidMount()
    {
        const {match: {params}} = this.props;
        let orderId = params.orderId;
        let api = properties.api.orderByCode + "/" + orderId;
        const token = sessionStorage.getItem("jwt");
        let order = {};

        fetch(api, {headers: {'Authorization': token}})
                .then(response => response.json())
                .then(response => {
                    console.log("Response: " + response)
                    // order = response
                    this.setState({
                        order: response
                    });
                })
                .catch(error => {
                    console.log(error);
                });

        console.log(order);
    }

    render()
    {
        return (
                <div className="container text-center">
                    {this.state.order ?
                            <div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="order-details">
                                            <div className="order_details_container">
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{properties.orderDetails.id}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="order_details_input" size="30"
                                                               id="orderId"
                                                               name="orderId"
                                                               readOnly={true}
                                                               defaultValue={this.state.order.id}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row justify-content-center delivery_address_title">
                                                    <strong>{properties.orderDetails.addressDetailsTitle}</strong>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{properties.orderDetails.city}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="order_details_input" size="30"
                                                               id="city"
                                                               name="city"
                                                               readOnly={true}
                                                               defaultValue={this.state.order.deliveryAddress ? this.state.order.deliveryAddress.city : ""}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{properties.orderDetails.street}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="order_details_input" size="30"
                                                               id="street"
                                                               name="street"
                                                               readOnly={true}
                                                               defaultValue={this.state.order.deliveryAddress ? this.state.order.deliveryAddress.street : ""}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="order-details">
                                            <div className="order_details_container">
                                                <div className="form-group row justify-content-center">
                                                    <strong>{properties.orderDetails.clientDetailsTitle}</strong>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{properties.orderDetails.customerName}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="order_details_input" size="30"
                                                               id="name"
                                                               name="name"
                                                               readOnly={true}
                                                               defaultValue={this.state.order.userData ? this.state.order.userData.name : ""}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{properties.orderDetails.customerLastName}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="order_details_input" size="30"
                                                               id="lastName"
                                                               name="lastName"
                                                               readOnly={true}
                                                               defaultValue={this.state.order.userData ? this.state.order.userData.lastName : ""}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{properties.orderDetails.customerEmail}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="order_details_input" size="30"
                                                               id="email"
                                                               name="email"
                                                               readOnly={true}
                                                               defaultValue={this.state.order.userData ? this.state.order.userData.email : ""}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{properties.orderDetails.customerPhone}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="order_details_input" size="30"
                                                               id="phone"
                                                               name="phone"
                                                               readOnly={true}
                                                               defaultValue={this.state.order.userData ? this.state.order.userData.phone : ""}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="order_items">
                                        {this.state.order.entries.map((entry, index) => {
                                            return (
                                                    <ul className="order_list" key={index}>
                                                        <li className="clearfix">
                                                            <div className="order_item_info d-flex flex-md-row flex-column justify-content-between">
                                                                <div className="order_item_name order_info_col">
                                                                    <div className="order_item_title">{properties.orderDetails.productName}</div>
                                                                    <div className="order_item_text">{entry.product.name}</div>
                                                                </div>
                                                                <div className="order_item_price order_info_col">
                                                                    <div className="order_item_title">{properties.orderDetails.productPrice}</div>
                                                                    <div className="order_item_text">{entry.product.price} lei</div>
                                                                </div>
                                                                <div className="order_info_col">
                                                                    <div className="order_item_title">{properties.orderDetails.productQuantity}</div>
                                                                    <div className="order_item_text">{entry.quantity}</div>
                                                                </div>
                                                                <div className="order_info_col">
                                                                    <div className="order_item_title">{properties.orderDetails.entryTotalPrice}</div>
                                                                    <div className="order_item_text">{entry.totalPrice} lei</div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                            )
                                        })}
                                    </div>
                                </div>
                                {this.state.order ?
                                        <div className="row justify-content-center">
                                            <div className="order_total">
                                                <div className="order_total_content text-md-right">
                                                    <div className="order_total_title">{properties.orderDetails.orderTotalPrice}</div>
                                                    <div className="order_total_amount">{this.state.order.totalPrice} lei</div>
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                            </div>
                            :
                            <h1>{properties.orderDetails.orderNotFoundDisplayText}</h1>
                    }
                </div>
        );
    }
}

export default OrderDetails;