import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {properties} from "../../properties";

class UserDetails extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            userId: '',
            user: null,
            name: ''
        };
    }

    componentDidMount()
    {
        const {match: {params}} = this.props;
        let userId = params.userId;

        this.getUserDetails(userId)
    }

    getUserDetails(userId)
    {
        let api = properties.api.userById + "/" + userId;
        const token = sessionStorage.getItem("jwt");

        fetch(api, {headers: {'Authorization': token}})
                .then(response => response.json())
                .then(response => {
                    // order = response
                    this.setState({
                        user: response,
                        name: response.name,
                        time: new Date().getTime()
                    });
                })
                .catch(error => {
                    console.log(error);
                });
    }

    render()
    {
        return (
                <div className="container text-center">
                    {this.state.user ?
                            <div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="user-details">
                                            <div className="user_details_container">
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{this.props.t('userDetails.id')}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="order_details_input" size="30"
                                                               id="orderId"
                                                               name="orderId"
                                                               readOnly={true}
                                                               defaultValue={this.state.user.id}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row justify-content-center delivery_address_title">
                                                    <strong>{this.props.t('userDetails.addressDetailsTitle')}</strong>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{this.props.t('userDetails.city')}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="order_details_input" size="30"
                                                               id="city"
                                                               name="city"
                                                               readOnly={true}
                                                               defaultValue={this.state.user.address ? this.state.user.address.city : ""}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{this.props.t('userDetails.street')}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="order_details_input" size="30"
                                                               id="street"
                                                               name="street"
                                                               readOnly={true}
                                                               defaultValue={this.state.user.address ? this.state.user.address.street : ""}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="order-details">
                                            <div className="order_details_container">
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{this.props.t('userDetails.name')}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="order_details_input" size="30"
                                                               id="name"
                                                               name="name"
                                                               readOnly={true}
                                                               defaultValue={this.state.user ? this.state.user.name : ""}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{this.props.t('userDetails.lastName')}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="user_details_input" size="30"
                                                               id="lastName"
                                                               name="lastName"
                                                               readOnly={true}
                                                               defaultValue={this.state.user ? this.state.user.lastName : ""}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{this.props.t('userDetails.email')}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="user_details_input" size="30"
                                                               id="email"
                                                               name="email"
                                                               readOnly={true}
                                                               defaultValue={this.state.user ? this.state.user.email : ""}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">{this.props.t('userDetails.phone')}</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="user_details_input" size="30"
                                                               id="phone"
                                                               name="phone"
                                                               readOnly={true}
                                                               defaultValue={this.state.user ? this.state.user.phone : ""}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <h2>{this.props.t('userDetails.userNotFoundDisplayText')}</h2>
                    }
                </div>
        )
    }
}

export default withTranslation()(UserDetails);