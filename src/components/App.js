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
    return (
        <div className="container-fluid">
            <NavBar 
                rootData={props.rootData}
                userData={props.userData}
                signUserIn={props.signUserIn}
            />
        </div>
    );
};

App.propTypes = {
    rootData: PropTypes.object,
    userData: PropTypes.object,
    signUserIn: PropTypes.func
};

export default hot(module)(App);

