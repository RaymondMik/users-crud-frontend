export const SIGN_USER_IN = 'SIGN_USER_IN';
export const SIGN_USER_IN_SUCCESS = 'SIGN_USER_IN_SUCCESS';
export const SIGN_USER_IN_FAILURE = 'SIGN_USER_IN_FAILURE';

/**
 * Log User In.
 * 
 * @param {Object} loginData - data needed to log user in.
 * @param {string} loginData.email - user's email.
 * @param {string} loginData.password - user's password.
 * @returns {Object} action.
 */
export const signUserIn = (userData) => {
    return {
        type: SIGN_USER_IN,
        userData,
        sentAt: Date.now()
    };
};

/**
 *  User successfully logged in.
 * 
 * @param {Object} userData - data of the user correctly logged in.
 * @param {string} userData._id - user's id.
 * @param {string} userData.username - user's username.
 * @param {string} userData.email - user's email.
 * @param {string} userData.role - user's role.
 * @returns {Object} action.
 */
export const signUserInSuccess = (userData) => {
    return {
        type: SIGN_USER_IN_SUCCESS,
        userData,
        receivedAt: Date.now()
    };
};

/**
 * Failed to log user in.
 * 
 * @param {Object} errors.
 * @returns {Object} action.
 */
export const signUserInFailure = (errors) => {
    return {
        type: SIGN_USER_IN_FAILURE,
        errors,
        receivedAt: Date.now()
    };
};