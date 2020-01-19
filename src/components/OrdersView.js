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

        fetch(api)
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
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Total Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.map((order, index) => {
                            return (
                                    <tr key={index}>
                                        <th scope="row">{order.id}</th>
                                        <td>{order.userName}</td>
                                        <td>{order.userLastName}</td>
                                        <td>{order.totalPrice}</td>
                                    </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
        );
    }
}

export default OrdersView;