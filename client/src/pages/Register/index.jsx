import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import authActions from "../../actions/auth";
import RESPONSE from '../../constants/responses';

import './style.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            chat_id: '',
            email: '',
            password: '',
            message: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            chat_id: this.state.chat_id,
            email: this.state.email,
            password: this.state.password
        };

        this.props.Register(user).then(res => {
            if (res.result === RESPONSE.SUCCESS) {
                this.props.history.push(`/login`);
            } else if (res.result === RESPONSE.USERS.CHAT_ID_REPEAT) {
                this.setState({ 
                    message: "Chat ID already exists.",
                });
            } else if (res.result === RESPONSE.USERS.USER_REPEAT) {
                this.setState({
                    message: "Same account already exists.",
                });
            } else {
                this.setState({ message: res.result });
            }
        });
    }

    render() { 
        return (
            <div className="login-form">
                <form onSubmit={this.onSubmit}>
                    <div className="avatar"><i className="material-icons">&#xE7FF;</i></div>
                    <h4 className="modal-title">Member Signup</h4>
                    <div className="form-group">
                        <input type="text" className="form-control" name="first_name" onChange={this.onChange} value={this.state.first_name} placeholder="First name" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="last_name" onChange={this.onChange} value={this.state.last_name} placeholder="Last name" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="chat_id" onChange={this.onChange} value={this.state.chat_id} placeholder="Chat ID" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" name="email" onChange={this.onChange} value={this.state.email} placeholder="Email" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" onChange={this.onChange} value={this.state.password} placeholder="Password" required="required" />
                    </div>
                    {this.state.message ? <span style={{ color: "red" }}>{this.state.message}<br /></span> : <span />}
                    <input type="submit" className="btn btn-primary btn-block btn-lg" value="Sign up" />
                </form>
                <div className="text-center small">If you have an account already, please <Link to="/login" className="nav-link">Log in</Link></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state.login });
const mapDispatchToProps = dispatch => bindActionCreators({ ...authActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));