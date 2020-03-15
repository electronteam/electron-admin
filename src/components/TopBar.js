import React, {Component} from 'react';
import {properties} from '../properties.js';
import Button from "@material-ui/core/Button";

class TopBar extends Component {
    render() {
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
                            {this.props.isAuth ? <div className="top_bar_contact_item logout_button">
                                <Button variant="contained" onClick={this.props.action}>Deconectare</Button>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopBar;