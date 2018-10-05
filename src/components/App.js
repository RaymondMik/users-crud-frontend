import React from 'react';
import { hot } from 'react-hot-loader';
//TODO being a demo project, we use bootstrap to ship quickly. BS might be removed in a real life project.
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import PropTypes from 'prop-types';
import '../assets/styles/app.scss';

/**
 * Application component
 */
const App = (props) => {
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

    const rootData = props.rootData.data.message;
    props.signUserIn({email:'ramon.miklus@gmail.com', password:'babbamia'});

    return (
        <div className="container-fluid">
            <NavBar 
                rootData={rootData}
            />
        </div>
    );
};

App.propTypes = {
    rootData: PropTypes.object,
    signUserIn: PropTypes.func
};

export default hot(module)(App);

