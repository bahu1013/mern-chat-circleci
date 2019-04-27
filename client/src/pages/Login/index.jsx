import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import authActions from "../../actions/auth";

import './style.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            showEmailError: false,
            showPasswordError: false,
            loginSuccess: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.props.clearLogin();
        this.setState({ 
            [e.target.name]: e.target.value,
            showEmailError: false,
            showPasswordError: false
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.clearLogin();

        this.props.Login(this.state.email, this.state.password).then(res => {
            this.props.LoadMe();
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        if (this.props.authenticated && this.props.auth && this.props.auth.token && this.props.currentUser) {
            return <Redirect to="/" />;
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
)(Login);
