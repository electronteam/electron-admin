import React, {Component} from 'react';
import './styles/App.css';

import TopBar from "./components/TopBar";
import {Footer} from "./components/Footer";
import Login from "./components/Login";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {HeaderMainMenu} from "./components/HeaderMainMenu";

class App extends Component {
    constructor(props)
    {
        super(props);

        // Bind the this context to the handler function
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            isAuthenticated: false
        };
    }

    authenticate(token)
    {
        sessionStorage.setItem("jwt", token);
        sessionStorage.setItem("isAuthenticated", "yes");
        this.setState({isAuthenticated: true});
    }

    logout() {
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("jwt");
        this.setState({isAuthenticated: false});
    }

    componentDidMount()
    {
        const authenticated  = sessionStorage.getItem("isAuthenticated");
        if (authenticated === "yes")
        {
            this.setState({isAuthenticated: true});
        }
    }

    render()
    {
        if (this.state.isAuthenticated === true)
        {
            return (
                    <MuiThemeProvider>
                        <div>
                            <TopBar action={this.logout} isAuth={this.state.isAuthenticated}/>
                            <HeaderMainMenu/>
                            <Footer/>
                        </div>
                    </MuiThemeProvider>
            );
        }
        else
        {
            return (
                    <div>
                        <TopBar isAuth={this.state.isAuthenticated}/>
                        <Login action = {this.authenticate}/>
                    </div>
            );
        }
    }
}

export default App;
