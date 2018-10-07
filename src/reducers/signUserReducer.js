import { 
    SIGN_USER_IN,
    SIGN_USER_IN_SUCCESS,
    SIGN_USER_IN_FAILURE,
    SIGN_USER_UP,
    SIGN_USER_UP_SUCCESS,
    SIGN_USER_UP_FAILURE,
    SIGN_USER_OUT,
    SIGN_USER_OUT_SUCCESS,
    SIGN_USER_OUT_FAILURE,
    RESET_SIGN_USER_STATE
  } from '../actions/signUserActions';

const initialState = {
    isFetching: false,
    errors: false,
    isSignedIn: false,
    responseReceived: null,
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
                responseReceived: null
            };
        case SIGN_USER_IN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                errors: false,
                isSignedIn: true,
                responseReceived: 'success',
                receivedAt: action.receivedAt,
                ...action.userData
            };
        case SIGN_USER_IN_FAILURE:
            return {
                ...state,
                isFetching: false,
                errors: action.errors,
                isSignedIn: false,
                responseReceived: 'failure',
                receivedAt: action.receivedAt
            };
        case SIGN_USER_UP:
            return {
                ...state,
                isFetching: true,
                errors: false,
                responseReceived: null
            };
        case SIGN_USER_UP_SUCCESS:
            return {
                ...state,
                isFetching: false,
                errors: false,
                responseReceived: 'success',
                receivedAt: action.receivedAt,
                ...action.userData
            };
        case SIGN_USER_UP_FAILURE:
            return {
                ...state,
                isFetching: false,
                errors: action.errors,
                responseReceived: 'failure',
                receivedAt: action.receivedAt
            };
        case SIGN_USER_OUT:
            return {
                ...state,
                isFetching: true,
                errors: false,
                responseReceived: null
            };
        case SIGN_USER_OUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                errors: false,
                isSignedIn: false,
                responseReceived: 'success',
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
                responseReceived: 'failure'
            };
        case RESET_SIGN_USER_STATE:
            return {
                ...state,
                isFetching: false,
                errors: false,
                responseReceived: null
            };
        default:
            return state;
    }
};

export default userData;