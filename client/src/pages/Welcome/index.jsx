import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import authActions from "../../actions/auth";
import Header from "../../components/Header";

class Welcome extends Component {
    render() { 
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="jumbotron mx-auto">
                        <span><h3>Welcome <span><h2>{this.props.login.currentUser ? this.props.login.currentUser.first_name : ''}</h2></span></h3></span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
    };
};
const mapDispatchToProps = dispatch => bindActionCreators({
    ...authActions
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Welcome);