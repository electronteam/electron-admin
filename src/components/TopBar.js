import React, {useContext} from 'react';
import {properties} from '../properties.js';
import {useTranslation} from "react-i18next";
import LocaleContext from "../LocaleContext";
import i18n from "../i18n";
import {NavDropdown} from "react-bootstrap";

export function TopBar(props)
{
    const {t} = useTranslation();
    const {locale} = useContext(LocaleContext);

    function changeLocale(l)
    {
        if (locale !== l)
        {
            i18n.changeLanguage(l);
        }
    }

    return (
            <div className="top_bar">
                <div className="container">
                    <div className="row">
                        {/*TODO - extract language selector into a separate component*/}
                        <div className="top_bar_select_language">
                            <NavDropdown title={t('language')} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#" onClick={() => changeLocale('en')}>English</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => changeLocale('ro')}>Română</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                        <div className="col d-flex flex-row">
                            <div className="top_bar_contact_item">
                                <div className="top_bar_icon"><img src="/phone.png" alt=""/></div>
                                {properties.contacts.phone}
                            </div>
                            <div className="top_bar_contact_item">
                                <div className="top_bar_icon">
                                    <img src="/mail.png" alt=""/>
                                </div>
                                <a href={properties.contacts.mailto}>{properties.contacts.email}</a>
                            </div>
                            {props.isAuth &&
                                    <div className="top_bar_contact_item">
                                        <button onClick={props.action} className="button generic_button">
                                            {t('buttons.logout')}
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
}

