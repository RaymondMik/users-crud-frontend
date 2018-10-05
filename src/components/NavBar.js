import React from 'react';
import { Route, NavLink as RouterNavLink, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import UserForm from './UserForm';
import SignOut from './SignOut';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {isSignedIn} = this.props.userData;
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">User Manager</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <RouterNavLink 
                                className="nav-link"
                                to={'/'} 
                                activeClassName='selected'
                            >Home</RouterNavLink>
                        </NavItem>
                        {isSignedIn && 
                            <NavItem>
                                <RouterNavLink 
                                    className="nav-link"
                                    to={'/sign-out'} 
                                    activeClassName='selected'
                                >Sign Out</RouterNavLink>
                            </NavItem>}
                        {!isSignedIn &&
                            <React.Fragment>
                                <NavItem>
                                    <RouterNavLink 
                                        className="nav-link"
                                        to={'/sign-in'} 
                                        activeClassName='selected'
                                    >Sign In</RouterNavLink>
                                </NavItem>
                                <NavItem>
                                    <RouterNavLink 
                                        className="nav-link"
                                        to={'/sign-up'} 
                                        activeClassName='selected'
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
                    />)
                }/>
                <Route path='/sign-in' exact render={(props) => (
                    <UserForm {...props}
                        userData={this.props.userData}
                        signUserIn={this.props.signUserIn}
                    />
                )
                }/>
                <Route path='/sign-up' component={UserForm} />
                <Route path='/sign-out' component={SignOut} />
            </ Switch>
            </div>
        );
    }
}

NavBar.propTypes = {
    rootData: PropTypes.object,
    userData: PropTypes.object,
    signUserIn: PropTypes.func
};

export default NavBar;