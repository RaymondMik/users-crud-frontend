import { 
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE  } from '../actions/getUsersActions';

const initialState = {
    isFetching: true,
    errors: false,
    items: {}
};

/**
 * Users reducer.
 * 
 * @param {Object} state.
 * @param {Object} action.
 * @returns {Object} a copy of the state modified according to the action dispatched.
 */
const users = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                isFetching: true,
                errors: false
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                errors: false,
                items: action.cryptos,
                receivedAt: action.receivedAt
            };
        case GET_USERS_FAILURE:
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

export default users;