import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {HeaderMainMenu} from "./HeaderMainMenu";
import {properties} from '../properties.js';

class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAuthenticated: false
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    login = () => {
        const user = {username: this.state.username, password: this.state.password};
        let api = properties.api.login;

        fetch(api, {
            method: 'POST',
            body: JSON.stringify(user)
        })
                .then(res => {
                    const jwtToken = res.headers.get('Authorization');
                    if (jwtToken !== null)
                    {
                        sessionStorage.setItem("jwt", jwtToken);
                        this.setState({isAuthenticated: true});
                    }
                })
                .catch(err => console.error(err))
    }

    render()
    {
        if (this.state.isAuthenticated === true)
        {
            return (<HeaderMainMenu/>)
        }
        else
        {
            return (
                    <div>
                        <TextField name="username" placeholder="Username" onChange={this.handleChange}/>
                        <br/>
                        <TextField type="password" name="password"
                                   placeholder="Password" onChange={this.handleChange}/>
                        <br/><br/>
                        <div className="button_container">
                            <button type="button" className="button generic_button" onClick={this.login}>
                                {properties.buttons.login}
                            </button>
                        </div>
                    </div>
            );
        }
    }
}

export default Login;