/**
 *  GET data from REST API via HTTP request.
 * 
 * @param {string} endpoint.
 * @param {string} dataType.
 * @returns {JSON} response from API.
 */
const getData = (endpoint, type) => {
    return fetch(
        endpoint, {method: 'GET'}).then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    }).catch( (err) => {
        throw new Error(`There was the following problem: ${err} while fetching ${type}`);
    });
};

/**
 *  POST data from REST API via HTTP request.
 * 
 * @param {string} endpoint.
 * @param {Object} payload.
 * @param {string} type.
 * @returns {JSON} response from API.
 */
const postData = async(endpoint, payload, type) => {
    let body = {};
    if (type === 'signUp') {
        body = JSON.stringify({
            userName: payload.userName, 
            email: payload.email, 
            password: payload.password,
            role: payload.role
        });
    }
    if (type === 'signIn') {
        body = JSON.stringify({
            email: payload.email, 
            password: payload.password
        });
    }

    try {
        const response = await fetch(
            endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        });
    
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    } catch(e) {
        throw new Error(`There was the following problem: ${e} while posting ${endpoint}`);
    }
};

/**
 *  Update data in REST API via HTTP PATCH request.
 * 
 * @param {string} endpoint.
 * @param {Object} payload.
 * @returns {JSON} response from API.
 */
const patchData = (endpoint, payload) => {
    return fetch(
        endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },  
        body: JSON.stringify({
            userName: payload.userName
        }),
    }).then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    }).catch( (err) => {
        throw new Error(`There was the following problem: ${err} while updating user ${payload.userName}`);
    });
};

/**
 *  DELETE data from REST API.
 * 
 * @param {string} endpoint.
 * @returns {JSON} response from API.
 */
const deleteData = (endpoint) => {
    return fetch(
        endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },  
    }).then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    }).catch( (err) => {
        throw new Error(`There was the following problem: ${err} while posting ${endpoint}`);
    });
};

export { getData, postData, patchData, deleteData };