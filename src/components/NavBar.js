import React from 'react';
import { Route, NavLink as RouterNavLink, Switch } from 'react-router-dom';
import UsersList from './UsersList';
import Settings from './Settings';
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
    DropdownItem } from 'reactstrap';

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
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                User
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <RouterNavLink
                                        className="nav-link"
                                        to={'/sign-in'} 
                                        activeClassName='selected'
                                    >Sign In</RouterNavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <RouterNavLink
                                        className="nav-link"
                                        to={'/sign-up'} 
                                        activeClassName='selected'
                                    >Sign Up</RouterNavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
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
                <Route path='/sign-in' component={Settings} />
                <Route path='/sign-up' component={Settings} />
            </ Switch>
            </div>
        );
    }
}

export default NavBar;