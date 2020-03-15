import React, {Component} from 'react';

import '../styles/login.css';
import {properties} from '../properties.js';

class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password: '',
            hasLoginFailed: false,
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    login = () => {
        const user = {email: this.state.email, password: this.state.password};
        let api = properties.api.login;

        fetch(api, {
            method: 'POST',
            body: JSON.stringify(user)
        })
                .then(res => {
                    if (res.status === 401)
                    {
                        this.setState({hasLoginFailed: true})
                    }
                    const jwtToken = res.headers.get('Authorization');
                    if (jwtToken !== null)
                    {
                        this.props.action(jwtToken);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
    };

    render()
    {
        return (
                <div className="container text-center">
                    <div className="row justify-content-center">
                        {this.state.hasLoginFailed && <div className="alert alert-danger invalid_credentials">{properties.login.invalidCredentialsText}</div>}
                    </div>
                    <div className="row justify-content-center">
                        <div className="login">
                            <div className="login_input">
                                <input type="text" className="generic_input" size="30"
                                       id="email"
                                       name="email"
                                       required="required"
                                       onChange={this.handleChange}
                                       placeholder={properties.login.emailPlaceHolder}/>
                            </div>
                            <div className="login_input">
                                <input type="password" className="generic_input" size="30"
                                       id="password"
                                       name="password"
                                       required="required"
                                       onChange={this.handleChange}
                                       placeholder={properties.login.passwordPlaceHolder}/>
                            </div>
                            <div className="button_container">
                                <button type="button" className="button generic_button" onClick={this.login}>
                                    {properties.buttons.login}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Login;