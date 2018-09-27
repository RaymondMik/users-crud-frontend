export const GET_ROOT = 'GET_ROOT';
export const GET_ROOT_SUCCESS = 'GET_ROOT_SUCCESS';
export const GET_ROOT_FAILURE = 'GET_ROOT_FAILURE';

/**
 * Get Root Data
 * 
 * @returns {Object} action.
 */
export const getRoot = () => {
    return {
        type: GET_ROOT,
        sentAt: Date.now()
    };
};

/**
 *  Root successfully received.
 * 
 * @param {Object} root.
 * @returns {Object} action.
 */
export const getRootSuccess = (data) => {
    return {
        type: GET_ROOT_SUCCESS,
        data,
        receivedAt: Date.now()
    };
};

/**
 * Failed to get Root.
 * 
 * @param {Object} errors.
 * @returns {Object} action.
 */
export const getRootFailure = (errors) => {
    return {
        type: GET_ROOT_FAILURE,
        errors,
        receivedAt: Date.now()
    };
};