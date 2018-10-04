import { 
    GET_ROOT,
    GET_ROOT_SUCCESS,
    GET_ROOT_FAILURE  } from '../actions/rootActions';

const initialState = {
    isFetching: false,
    errors: false,
    data: {}
};

/**
 * Root reducer.
 * 
 * @param {Object} state.
 * @param {Object} action.
 * @returns {Object} a copy of the state modified according to the action dispatched.
 */
const rootData = (state = initialState, action) => {
    switch (action.type) {
        case GET_ROOT:
            return {
                ...state,
                isFetching: true,
                errors: false
            };
        case GET_ROOT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                errors: false,
                data: action.data,
                receivedAt: action.receivedAt
            };
        case GET_ROOT_FAILURE:
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

export default rootData;