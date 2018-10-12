import React from 'react';
import { Route, NavLink as RouterNavLink, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import UserForm from './UserForm';
import UserPage from './UserPage';
import UserList from './UserList';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    handleNavBarToggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {_id, token} = this.props.userData;
        return (
            <div className="container-fluid">
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">User Manager</NavbarBrand>
                    <NavbarToggler onClick={this.handleNavBarToggle.bind(this)} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <RouterNavLink 
                                className="nav-link"
                                to={'/'} 
                                activeClassName="selected"
                            >Home</RouterNavLink>
                        </NavItem>
                        {token && 
                            <NavItem>
                                <NavLink 
                                    className="nav-link"
                                    onClick={() => this.props.signUserOut(_id, token)}
                                >Sign Out</NavLink>
                            </NavItem>}
                        {!token &&
                            <React.Fragment>
                                <NavItem>
                                    <RouterNavLink 
                                        className="nav-link"
                                        to={'/sign-in'} 
                                        activeClassName="selected"
                                    >Sign In</RouterNavLink>
                                </NavItem>
                                <NavItem>
                                    <RouterNavLink 
                                        className="nav-link"
                                        to={'/sign-up'} 
                                        activeClassName="selected"
                                    >Sign Up</RouterNavLink>
                                </NavItem>
                            </React.Fragment>}
                    </Nav>
                    </Collapse>
                </Navbar>
                <Switch>
                    <Route path='/' exact render={(props) => (
                        <HomePage {...props}
                            rootData={this.props.rootData}
                            userData={this.props.userData}
                        />)}/>
                    <Route path='/sign-in' exact render={(props) => (
                        <UserForm {...props}
                            userData={this.props.userData}
                            signUserIn={this.props.signUserIn}
                            resetSignUserState={this.props.resetSignUserState}
                        />)}/>
                    <Route path='/sign-up' exact render={(props) => (
                        <UserForm {...props}
                            userData={this.props.userData}
                            signUserIn={this.props.signUserIn}
                            signUserUp={this.props.signUserUp}
                            resetSignUserState={this.props.resetSignUserState}
                    />)}/>
                    <Route path='/user-page' component={UserPage} />
                    <Route path='/user-list' exact render={(props) => (
                        <UserList {...props}
                            userData={this.props.userData}
                            getUsers={this.props.getUsers}
                        />
                    )}/>
                </ Switch>
            </div>
        );
    }
}

NavBar.propTypes = {
    rootData: PropTypes.object,
    userData: PropTypes.object,
    signUserIn: PropTypes.func,
    signUserUp: PropTypes.func,
    signUserOut: PropTypes.func,
    resetSignUserState: PropTypes.func,
    getUsers: PropTypes.func
};

export default NavBar;