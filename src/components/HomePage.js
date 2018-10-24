import React from 'react';
import { connect } from 'react-redux';
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
    const {userData, userData: {_id, userName, role, token}} = props;
    
    return (
        <div className="container">
            <Jumbotron>
                {!token ? 
                    <React.Fragment>
                        <h2 className="display-3">{message}</h2>
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
                        <span> {  } </span>
                        <NavLink 
                            className="btn btn-primary"
                            to={'/sign-up'} 
                            activeClassName='selected'
                        >
                            Create a new profile
                        </NavLink>
                    </React.Fragment> :
                    <React.Fragment>
                        <h2 className="display-3">Welcome {userName}!</h2>
                        <p className="lead">{role === 'admin' ? 'You can manage your users here.' : 'You can see and edit you profile here.'}</p>
                        <hr className="my-2" />
                        <NavLink 
                            className="btn btn-primary"
                            to={{
                                pathname: `/user-page/${_id}`,
                                state: {
                                    isFromList: false,
                                    previousPath: location.pathname
                                }
                            }}
                            activeClassName='selected'
                        >
                            Manage your profile
                        </NavLink>
                        {role === 'admin' && 
                            <React.Fragment>
                                <span> { } </span>
                                <NavLink 
                                    className="btn btn-primary"
                                    to={'/user-list'} 
                                    activeClassName='selected'
                                >
                                    Manage user list
                                </NavLink>
                            </React.Fragment>
                        }
                    </React.Fragment>}
            </Jumbotron>
        </div>
    );
};

HomePage.propTypes = {
    rootData: PropTypes.object,
    userData: PropTypes.object
};

// connect to Redux store
export default connect(
    // props
    (state, otherProps) => ({
        ...otherProps,
        rootData: state.rootData,
        userData: state.userData
    }),
    // actions
    {}
  )(HomePage);