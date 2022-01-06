import React, {Suspense, useEffect, useState} from 'react';
import './styles/App.css';
import i18n from './i18n';
import {TopBar} from "./components/TopBar";
import {Footer} from "./components/Footer";
import Login from "./components/Login";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {HeaderMainMenu} from "./components/HeaderMainMenu";
import LocaleContext from './LocaleContext';
import Loading from "./components/Loading";

function App()
{
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [locale, setLocale] = useState(i18n.language);

    i18n.on('languageChanged', (lng) => setLocale(i18n.language));

    useEffect(() => {
        const authenticated = sessionStorage.getItem("isAuthenticated");
        setIsAuthenticated(authenticated === 'yes')
    }, [])

    const authenticate = (token) => {
        sessionStorage.setItem("jwt", token);
        sessionStorage.setItem("isAuthenticated", "yes");
        setIsAuthenticated(true)
    }

    const logout = () => {
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("jwt");
        setIsAuthenticated(false)
    }

    if (isAuthenticated === true)
    {
        return (
                <LocaleContext.Provider value={{locale, setLocale}}>
                    <Suspense fallback={<Loading/>}>
                        <MuiThemeProvider>
                            <div>
                                <TopBar action={logout} isAuth={isAuthenticated}/>
                                <HeaderMainMenu/>
                                <Footer/>
                            </div>
                        </MuiThemeProvider>
                    </Suspense>
                </LocaleContext.Provider>
        );
    }
    return (
            <LocaleContext.Provider value={{locale, setLocale}}>
                <Suspense fallback={<Loading/>}>
                    <div>
                        <TopBar isAuth={isAuthenticated}/>
                        <Login action={authenticate}/>
                    </div>
                </Suspense>
            </LocaleContext.Provider>
    );
}

export default App;
