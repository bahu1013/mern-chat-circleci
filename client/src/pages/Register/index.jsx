import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import authActions from "../../actions/auth";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        console.log(this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };

        this.props.Register(user).then(res => {
            this.props.history.push(`/login`);
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
                        <input type="email" className="form-control" name="email" onChange={this.onChange} value={this.state.email} placeholder="Email" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" onChange={this.onChange} value={this.state.password} placeholder="Password" required="required" />
                    </div>
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