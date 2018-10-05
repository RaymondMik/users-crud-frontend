import React from 'react';
import { Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomePage = (props) => {
    // Render Loader
    if (props.rootData.isFetching) {
        return (
            <div>
                <h3>...Loading</h3>
            </div>
        );
    }

    // Render ErrorBoundary via componentDidCatch()
    if (props.rootData.errors) {
        throw new Error('Something went wrong while fetching API data!');
    }

    const message = props.rootData.data.message;
    return (
        <div className="container">
            <Jumbotron>
                <h1 className="display-3">{message}</h1>
                <p className="lead">Login and manage your customers database with the User Manager application.</p>
                <hr className="my-2" />
                <p>Just some additional text to show how cool Jumbotrons are.</p>
                <NavLink 
                    className="btn btn-primary"
                    to={'/sign-in'} 
                    activeClassName='selected'
                >
                    Sign In
                </NavLink>
                <span><b> or </b></span>
                <NavLink 
                    className="btn btn-primary"
                    to={'/sign-up'} 
                    activeClassName='selected'
                >
                    Sign Up
                </NavLink>
        </Jumbotron>
        </div>
    );
};

HomePage.propTypes = {
    rootData: PropTypes.object
};

export default HomePage;