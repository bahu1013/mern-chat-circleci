import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import authActions from "../../actions/auth";
import Header from "../../components/Header";

class Dashboard extends Component {
    render() { 
        return ( 
            <div>
                <Header />
                <div className="container">
                    <div className="jumbotron mx-auto">
                        <span>
                            <h2>Dashboard</h2>
                        </span>
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
)(Dashboard);