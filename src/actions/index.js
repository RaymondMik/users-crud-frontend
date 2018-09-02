export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

/**
 * Get Cryptocurrencies.
 * 
 * @returns {Object} action.
 */
export const getUsers = () => {
    return {
        type: GET_USERS,
        sentAt: Date.now()
    };
};

/**
 *  Users successfully received.
 * 
 * @param {Object} users.
 * @returns {Object} action.
 */
export const getUsersSuccess = (users) => {
    return {
        type: GET_USERS_SUCCESS,
        users,
        receivedAt: Date.now()
    };
};

/**
 * Failed to get users.
 * 
 * @param {Object} errors.
 * @returns {Object} action.
 */
export const getUsersFailure = (errors) => {
    return {
        type: GET_USERS_FAILURE,
        errors,
        receivedAt: Date.now()
    };
};