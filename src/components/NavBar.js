import React from 'react';
import { Route, NavLink as RouterNavLink, Switch } from 'react-router-dom';
import UserForm from './UserForm';
import Settings from './Settings';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem } from 'reactstrap';

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
                        <NavItem>
                            <RouterNavLink 
                                className="nav-link"
                                to={'/settings'} 
                                activeClassName='selected'
                            >Settings</RouterNavLink>
                        </NavItem>
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
                    </Nav>
                    </Collapse>
                </Navbar>
                <Switch>
                {/*<Route path='/' exact render={(props) => (
                    <UsersList {...props}
                        users={{}}
                    />
                )} />*/}
                <Route path='/settings' component={Settings} />
                <Route path='/sign-in' component={UserForm} />
                <Route path='/sign-up' component={UserForm} />
            </ Switch>
            </div>
        );
    }
}

export default NavBar;