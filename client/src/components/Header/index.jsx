import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
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
            this.props.history.push("/login");
        }

        return (
            <div>
                <Navbar color="light" light expand="md">
                <NavbarBrand href="/">LOGO</NavbarBrand>
                <Collapse navbar>
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
                                <a href="javascript;" onClick={this.logout} className="nav-link">
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