import React from 'react';
import './styles/App.css';

import {TopBar} from "./components/TopBar";
import {Footer} from "./components/Footer";
import Login from "./components/Login";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function App()
{
  return (
          <MuiThemeProvider>
            <div>
              <TopBar/>
              <Login/>
              <Footer/>
            </div>
          </MuiThemeProvider>
  );
}

export default App;
