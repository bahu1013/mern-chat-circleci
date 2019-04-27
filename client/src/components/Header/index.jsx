import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem 
} from 'reactstrap';

import authActions from '../../actions/auth';
// import './style.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    
    logout(e) {
        e.preventDefault();
        this.props.Logout();
        this.props.history.push("/login");
    }

    render() { 
        if (this.props.currentUser === null) {
            return <Redirect to="/login" />;
        }

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        {this.props.currentUser ? this.props.currentUser.first_name : ''} {this.props.currentUser ? this.props.currentUser.last_name : ''}
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logout} className="nav-link">Logout</a>
                </li>
            </ul>
        );

        return (
            <div>
                <Navbar color="light" light expand="md">
                <NavbarBrand href="/">LOGO</NavbarBrand>
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/dashboard/">Dashboard</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="pull-right" navbar>
                        <UncontrolledDropdown nav inNavbar className="pull-right">
                            <DropdownToggle nav caret>
                                {this.props.currentUser ? this.props.currentUser.first_name : ''} {this.props.currentUser ? this.props.currentUser.last_name : ''}
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem>
                                <Link to="/profile" className="nav-link">
                                    <span className="icon fa fa-user" />
                                    &nbsp;&nbsp;&nbsp;&nbsp; Profile
                                </Link>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                <a href="" onClick={this.logout} className="nav-link">
                                    <span className="icon fa fa-sign-out" />
                                    &nbsp;&nbsp;&nbsp;&nbsp;Logout
                                </a>
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state.login });
const mapDispatchToProps = dispatch => bindActionCreators({
    ...authActions
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Header));