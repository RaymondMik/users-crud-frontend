export const SIGN_USER_IN = 'SIGN_USER_IN';
export const SIGN_USER_IN_SUCCESS = 'SIGN_USER_IN_SUCCESS';
export const SIGN_USER_IN_FAILURE = 'SIGN_USER_IN_FAILURE';
export const SIGN_USER_UP = 'SIGN_USER_UP';
export const SIGN_USER_UP_SUCCESS = 'SIGN_USER_UP_SUCCESS';
export const SIGN_USER_UP_FAILURE = 'SIGN_USER_UP_FAILURE';
export const SIGN_USER_OUT = 'SIGN_USER_OUT';
export const SIGN_USER_OUT_SUCCESS = 'SIGN_USER_OUT_SUCCESS';
export const SIGN_USER_OUT_FAILURE = 'SIGN_USER_OUT_FAILURE';
export const RESET_SIGN_USER_STATE = 'RESET_SIGN_USER_STATE';

/**
 * Sign User In.
 * 
 * @param {Object} userData - data needed to sign user in.
 * @param {string} userData.email - user's email.
 * @param {string} userData.password - user's password.
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
 *  User successfully signed in.
 * 
 * @param {Object} userData - data of the user successfully signed in.
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
 * Failed to sign user in.
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

/**
 * Sign User Up.
 * 
 * @param {Object} userData - data needed to sign user up.
 * @param {string} userData.userName - user's user name
 * @param {string} userData.email - user's email.
 * @param {string} userData.password - user's password.
 * @returns {Object} action.
 */
export const signUserUp = (userData) => {
    return {
        type: SIGN_USER_UP,
        userData,
        sentAt: Date.now()
    };
};

/**
 *  User successfully signed up.
 * 
 * @param {Object} userData - data of the user successfully signed up.
 * @param {string} userData._id - user's id.
 * @param {string} userData.username - user's username.
 * @param {string} userData.email - user's email.
 * @param {string} userData.role - user's role.
 * @returns {Object} action.
 */
export const signUserUpSuccess = (userData) => {
    return {
        type: SIGN_USER_UP_SUCCESS,
        userData,
        receivedAt: Date.now()
    };
};

/**
 * Failed to sign user up.
 * 
 * @param {Object} errors.
 * @returns {Object} action.
 */
export const signUserUpFailure = (errors) => {
    return {
        type: SIGN_USER_UP_FAILURE,
        errors,
        receivedAt: Date.now()
    };
};

/**
 * Sign User Out.
 * 
 * @param {string} _id - user's id.
 * @param {string} token - user's token.
 * @returns {Object} action.
 */
export const signUserOut = (_id, token) => {
    return {
        type: SIGN_USER_OUT,
        _id,
        token,
        sentAt: Date.now()
    };
};

/**
 *  User successfully signed out.
 * 
 * @returns {Object} action.
 */
export const signUserOutSuccess = () => {
    return {
        type: SIGN_USER_OUT_SUCCESS,
        receivedAt: Date.now()
    };
};

/**
 * Failed to sign user out.
 * 
 * @param {Object} errors.
 * @returns {Object} action.
 */
export const signUserOutFailure = (errors) => {
    return {
        type: SIGN_USER_OUT_FAILURE,
        errors,
        receivedAt: Date.now()
    };
};

/**
 * Reset sign user state to default.
 * 
 * @returns {Object} action.
 */
export const resetSignUserState = () => {
    return {
        type: RESET_SIGN_USER_STATE
    };
};