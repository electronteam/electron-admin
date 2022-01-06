import React from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import {properties} from '../properties.js';
import OrderDetails from "./orders/OrderDetails";
import ProductDetails from "./products/ProductDetails";
import CreateProduct from "./products/CreateProduct";
import {useTranslation} from "react-i18next";

export function HeaderMainMenu()
{
    const {t} = useTranslation();

    return (
            <BrowserRouter>

                <header className="site-navbar">
                    <div className="site-navbar-top">
                        <div className="container">
                            <div className="row d-flex flex-wrap align-items-center">
                                <div className="col-sm-3 text-left">
                                    <Link to="/" className="logo">
                                        <img src="/electron-logo.png" alt="LOGO" className="logo"/>
                                        <span>ELECTRON</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Navigation menu*/}
                    <nav className="site-navigation text-right text-md-center" role="navigation">
                        <ul className="main-nav">
                            {properties.header.links.map((link, index) => {
                                return (
                                        <li key={index}>
                                            <Link to={link.path} className="link">
                                                {t('header.' + link.id + '.display')}
                                            </Link>
                                        </li>
                                )
                            })}
                        </ul>
                    </nav>
                </header>

                {properties.header.links.map((link, index) => {
                    return <Route path={link.path} exact={true} component={link.component} key={index}/>
                })}

                <Route path={properties.orderDetails.path + ":" + properties.orderDetails.paramName} component={OrderDetails}/>
                <Route path={properties.productDetails.path + ":" + properties.productDetails.paramName} component={ProductDetails}/>
                <Route path={properties.createProduct.path} component={CreateProduct}/>
            </BrowserRouter>
    );
}