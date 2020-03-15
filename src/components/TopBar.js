import React, {Component} from 'react';
import {properties} from '../properties.js';

class TopBar extends Component {

    render()
    {
        return (
                <div className="top_bar">
                    <div className="container">
                        <div className="row">
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
                                {this.props.isAuth &&
                                <div className="top_bar_contact_item">
                                    <button onClick={this.props.action} className="button generic_button">
                                        {properties.buttons.logout}
                                    </button>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default TopBar;