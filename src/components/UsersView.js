import React, {Component} from 'react';
import {properties} from '../properties.js';

class UsersView extends Component {
    constructor()
    {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount()
    {
        let api = properties.api.allUsers;
        // Read the token from the session storage // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");

        fetch(api, {headers: {'Authorization': token}})
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        users: response
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
                    {this.state.users.length > 0 ?
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col" className="text-left">{properties.usersView.name}</th>
                                    <th scope="col" className="text-left">{properties.usersView.lastName}</th>
                                    <th scope="col" className="text-left">{properties.usersView.email}</th>
                                    <th scope="col" className="text-left">{properties.usersView.phone}</th>
                                    <th scope="col" className="text-left">{properties.usersView.role}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.users.map((user, index) => {
                                    return (
                                            <tr key={index}>
                                                <td className="text-left">{user.name}</td>
                                                <td className="text-left">{user.lastName}</td>
                                                <td className="text-left">{user.email}</td>
                                                <td className="text-left">{user.phone}</td>
                                                <td className="text-left">{user.role}</td>
                                            </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            :
                            <h1>{properties.usersView.noUserDisplayText}</h1>
                    }
                </div>
        );
    }
}

export default UsersView;