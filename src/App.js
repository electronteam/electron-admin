import React, {Component} from 'react';
import './styles/App.css';

import {TopBar} from "./components/TopBar";
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
                            <TopBar/>
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
                        <TopBar/>
                        <Login action = {this.authenticate}/>
                    </div>
            );
        }
    }
}

export default App;
