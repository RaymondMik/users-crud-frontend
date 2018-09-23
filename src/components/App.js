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
    
    return (
        <div>
            <NavBar />
            <div>{rootData}</div>
        </div>
    );
};

App.propTypes = {
    rootData: PropTypes.object
};

export default hot(module)(App);

