import React from 'react';
import {properties} from '../properties.js';

export function TopBar()
{
    return (
            <div className="top_bar">
                <div className="container">
                    <div className="row">
                        <div className="col d-flex flex-row">
                            <div className="top_bar_contact_item">
                                <div className="top_bar_icon"><img src="/phone.png" alt=""/></div>{properties.contacts.phone}
                            </div>
                            <div className="top_bar_contact_item">
                                <div className="top_bar_icon">
                                    <img src="/mail.png" alt=""/>
                                </div>
                                <a href={properties.contacts.mailto}>{properties.contacts.email}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}