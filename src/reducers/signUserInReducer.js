import { 
    SIGN_USER_IN,
    SIGN_USER_IN_SUCCESS,
    SIGN_USER_IN_FAILURE  } from '../actions/signUserInActions';

const initialState = {
    isFetching: false,
    errors: false,
    isSignedIn: false,
    responseReceived: false
};

/**
 * Log User In reducer.
 * 
 * @param {Object} state.
 * @param {Object} action.
 * @returns {Object} a copy of the state modified according to the action dispatched.
 */
const userData = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_USER_IN:
            return {
                ...state,
                isFetching: true,
                errors: false,
                isSignedIn: false,
                responseReceived: false
            };
        case SIGN_USER_IN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                errors: false,
                isSignedIn: true,
                responseReceived: true,
                receivedAt: action.receivedAt,
                ...action.userData
            };
        case SIGN_USER_IN_FAILURE:
            return {
                ...state,
                isFetching: false,
                errors: action.errors,
                isSignedIn: false,
                responseReceived: true,
                receivedAt: action.receivedAt
            };
        default:
            return state;
    }
};

export default userData;