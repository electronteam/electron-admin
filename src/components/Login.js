import React, {Component} from 'react';
import '../styles/login.css';
import { withTranslation } from 'react-i18next';

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
        let api = process.env.REACT_APP_LOGIN;

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
                        {this.state.hasLoginFailed && <div className="alert alert-danger invalid_credentials">{this.props.t('login.invalidCredentialsText')}</div>}
                    </div>
                    <div className="row justify-content-center">
                        <div className="login">
                            <div className="login_input">
                                <input type="text" className="generic_input" size="30"
                                       id="email"
                                       name="email"
                                       required="required"
                                       onChange={this.handleChange}
                                       placeholder={this.props.t('login.emailPlaceHolder')}/>
                            </div>
                            <div className="login_input">
                                <input type="password" className="generic_input" size="30"
                                       id="password"
                                       name="password"
                                       required="required"
                                       onChange={this.handleChange}
                                       placeholder={this.props.t('login.passwordPlaceHolder')}/>
                            </div>
                            <div className="button_container">
                                <button type="button" className="button generic_button" onClick={this.login}>
                                    {this.props.t('buttons.login')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default withTranslation()(Login);