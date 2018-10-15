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
        <React.Fragment>
            <NavBar 
                rootData={props.rootData}
                userData={props.userData}
                usersList={props.usersList}
                signUserIn={props.signUserIn}
                signUserUp={props.signUserUp}
                signUserOut={props.signUserOut}
                resetSignUserState={props.resetSignUserState}
                getUsers={props.getUsers}
            />
        </React.Fragment>
    );
};

App.propTypes = {
    rootData: PropTypes.object,
    userData: PropTypes.object,
    usersList: PropTypes.object,
    signUserIn: PropTypes.func,
    signUserUp: PropTypes.func,
    signUserOut: PropTypes.func,
    resetSignUserState: PropTypes.func,
    getUsers: PropTypes.func
};

export default hot(module)(App);

