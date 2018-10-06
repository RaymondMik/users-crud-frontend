import { 
    SIGN_USER_IN,
    SIGN_USER_IN_SUCCESS,
    SIGN_USER_IN_FAILURE,
    SIGN_USER_OUT,
    SIGN_USER_OUT_SUCCESS,
    SIGN_USER_OUT_FAILURE,
    RESET_SIGN_USER_STATE
  } from '../actions/signUserActions';

const initialState = {
    isFetching: false,
    errors: false,
    isSignedIn: false,
    responseReceived: false,
    _id: null,
    token: null,
    username: null,
    email: null,
    role: null
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
        case SIGN_USER_OUT:
            return {
                ...state,
                isFetching: true,
                errors: false,
                responseReceived: false
            };
        case SIGN_USER_OUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                errors: false,
                isSignedIn: false,
                responseReceived: true,
                _id: null,
                token: null,
                userName: null,
                email: null,
                role: null
            };
        case SIGN_USER_OUT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errors: action.errors,
                responseReceived: true
            };
        case RESET_SIGN_USER_STATE:
            return {
                ...state,
                isFetching: false,
                errors: false,
                responseReceived: false
            };
        default:
            return state;
    }
};

export default userData;