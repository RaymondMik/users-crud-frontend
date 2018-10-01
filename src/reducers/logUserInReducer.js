import { 
    LOG_USER_IN,
    LOG_USER_IN_SUCCESS,
    LOG_USER_IN_FAILURE  } from '../actions/logUserInActions';

const initialState = {
    isFetching: true,
    errors: false,
    userData: {}
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
        case LOG_USER_IN:
            return {
                ...state,
                isFetching: true,
                errors: false
            };
        case LOG_USER_IN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                errors: false,
                userData: action.userData,
                receivedAt: action.receivedAt
            };
        case LOG_USER_IN_FAILURE:
            return {
                ...state,
                isFetching: false,
                errors: action.errors,
                receivedAt: action.receivedAt
            };
        default:
            return state;
    }
};

export default userData;