import React, {Component} from 'react';
import {properties} from '../properties.js';
import {Redirect} from 'react-router-dom';

class OrdersView extends Component {
    constructor()
    {
        super();
        this.state = {
            orders: [],
            toOrderDetails: false,
            selectedOrderId: ''
        };
    }

    componentDidMount()
    {
        let api = properties.api.allOrders;
        // Read the token from the session storage // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");

        fetch(api, {headers: {'Authorization': token}})
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        orders: response
                    });
                })
                .catch(error => {
                    console.log(error);
                });
    }

    viewOrderDetails(orderId)
    {
        this.setState(() => ({toOrderDetails: true, selectedOrderId: orderId}));
    }

    render()
    {
        if (this.state.toOrderDetails === true)
        {
            return <Redirect to={{
                pathname: properties.orderDetails.path + this.state.selectedOrderId,
            }}/>
        }

        return (
                <div className="container text-center">
                    {this.state.orders.length > 0 ?
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">{properties.ordersView.id}</th>
                                    <th scope="col" className="text-left">{properties.ordersView.customerName}</th>
                                    <th scope="col" className="text-left">{properties.ordersView.customerLastName}</th>
                                    <th scope="col" className="text-left">{properties.ordersView.totalPrice}</th>
                                    <th scope="col" className="text-left">{properties.ordersView.createdDate}</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.orders.map((order, index) => {
                                    return (
                                            <tr key={index}>
                                                <th scope="row">{order.id}</th>
                                                <td className="text-left">{order.userName}</td>
                                                <td className="text-left">{order.userLastName}</td>
                                                <td className="text-left">{order.totalPrice}</td>
                                                <td className="text-left">Created Date</td>
                                                <td className="text-center">
                                                    <button type="button" className="button generic_button"
                                                            onClick={() => this.viewOrderDetails(order.id)}>
                                                        {properties.ordersView.viewDetails}
                                                    </button>
                                                </td>
                                            </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            :
                            <h1>{properties.ordersView.noOrdersDisplayText}</h1>
                    }
                </div>
        );
    }
}

export default OrdersView;