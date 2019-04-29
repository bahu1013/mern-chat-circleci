import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import authActions from "../../actions/auth";
import RESPONSE from '../../constants/responses';

import './style.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            message: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.props.clearLogin();
        this.setState({ 
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.clearLogin();

        this.props.Login(this.state.email, this.state.password).then(res => {
            if (res.result === RESPONSE.SUCCESS) {
                this.props.LoadMe();
            } else if (res.result === RESPONSE.USERS.INVALID_EMAIL_PASSWORD) {
                this.setState({
                    message: "Invalid email or password.",
                });
            } else {
                this.setState({ message: res.result });
            }
        });
    }

    render() {
        if (this.props.authenticated && this.props.auth && this.props.auth.token && this.props.currentUser) {
            this.props.history.push("/");
        }
        return (
            <div className="login-form">    
                <form onSubmit={this.onSubmit}>
                    <div className="avatar"><i className="material-icons">&#xE7FF;</i></div>
                    <h4 className="modal-title">Member Login</h4>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user" /></span>
                            <input type="email" className="form-control" name="email" onChange={this.onChange} value={this.state.email} placeholder="Email" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-lock" /></span>
                            <input type="password" className="form-control" name="password" onChange={this.onChange} value={this.state.password} placeholder="Password" required="required" />
                        </div>
                    </div>
                    {this.state.message ? <span style={{ color: "red" }}>{this.state.message}<br /></span> : <span />}
                    <input type="submit" className="btn btn-primary btn-block btn-lg" value="Login" />
                </form>
                <div className="text-center small">Don't have an account? <Link to="/register" className="nav-link">Sign up</Link></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state.login });
const mapDispatchToProps = dispatch => bindActionCreators({ ...authActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
