import React, {Component} from 'react';
import {properties} from '../properties.js';

class OrdersView extends Component {
    constructor()
    {
        super();
        this.state = {
            orders: []
        };
    }

    componentDidMount()
    {
        let api = properties.api.allOrders;
        // Read the token from the session storage // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");

        fetch(api, {headers: {'Authorization': token} })
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

    render()
    {
        return (
                <div className="container text-center">
                    {this.state.orders.length > 0 ?
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col" className="text-left">Name</th>
                            <th scope="col" className="text-left">Last Name</th>
                            <th scope="col" className="text-left">Total Price</th>
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