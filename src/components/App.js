import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, NavLink, Switch } from 'react-router-dom';
import UsersList from './UsersList';
import PropTypes from 'prop-types';
import Settings from './Settings';
import '../assets/styles/app.scss';

/**
 * Application component
 */
const App = (props) => {
    // Render Loader
    if (props.users.isFetching) {
        return (
            <div>
                <h3>...Loading</h3>
            </div>
        );
    }

    // Render ErrorBoundary via componentDidCatch()
    if (props.users.errors) {
        throw new Error('Something went wrong while fetching API data!');
    }

    const users = props.users.items.data;
    
    return (
        <div>
            <h2>Users App</h2>
            <header>
                <NavLink to={'/'} activeClassName='selected'>Home</NavLink>
                <NavLink to={'/settings'} activeClassName='selected'>Settings</NavLink>
            </header>
            <Switch>
                <Route path='/' exact render={(props) => (
                    <UsersList {...props}
                        users={users}
                    />
                )} />
                <Route path='/settings' component={Settings} />
            </ Switch>
        </div>
    );
};

App.propTypes = {
    cryptos: PropTypes.object
};

export default hot(module)(App);

