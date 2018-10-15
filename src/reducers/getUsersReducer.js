import { 
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE  } from '../actions/getUsersActions';

const initialState = {
    isFetching: false,
    errors: false,
    list: []
};

/**
 * Users reducer.
 * 
 * @param {Object} state.
 * @param {Object} action.
 * @returns {Object} a copy of the state modified according to the action dispatched.
 */
const usersList = (state = initialState, action) => {
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
                list: action.users,
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

export default usersList;