import React from 'react';
import './styles/App.css';

import {TopBar} from "./components/TopBar";
import {HeaderMainMenu} from "./components/HeaderMainMenu";
import {Footer} from "./components/Footer";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function App()
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

export default App;
