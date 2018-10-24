/**
 *  GET data from REST API via HTTP request.
 * 
 * @param {string} endpoint.
 * @param {string} dataType.
 * @returns {JSON} response from API.
 */
const getData = async(endpoint, payload, type) => {
    try {
        const requestParams = {
            method: 'GET',
            mode: 'cors',
            headers: {}
        };
    
        if (type === 'users') requestParams.headers['x-auth'] = payload;
        
        const response = await fetch(
            endpoint, 
            requestParams
        );

        if (!response.ok) throw new Error(response.statusText);

        return response.json();
    } catch(e) {
        throw new Error(`${e}`);
    }
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
    const requestParams = {
        method: 'POST',
        body: {},
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    };
  
    if (type === 'signUp') {
        requestParams.body = JSON.stringify({
            userName: payload.userName, 
            email: payload.email, 
            password: payload.password,
            role: 'user'
        });
    }
    if (type === 'signIn') {
        requestParams.body = JSON.stringify({
            email: payload.email, 
            password: payload.password
        });
    }
    if (type === 'signOut') {
        const xAuth = payload;
        requestParams.headers['x-auth'] = xAuth;
        delete requestParams.body;
    }

    try {
        const response = await fetch(
            endpoint, 
            requestParams
        );
        
        if (!response.ok) throw new Error(response.statusText);

        if (type === 'signOut' || type === 'signUp') {
            const responseData = await response.json();
 
            return responseData;
        } else {
            const token = response.headers.get('x-auth');
            const userData = await response.json();
           
            return {token, ...userData};
        }
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
const patchData = async(endpoint, payload) => {
    // return fetch(
    //     ).then(response => {
    //     if (!response.ok) throw new Error(response.statusText);
    //     return response.json();
    // }).catch( (err) => {
    //     throw new Error(`There was the following problem: ${err} while updating user ${payload.userName}`);
    // });

    try {
        console.log(555, payload.newData);
        const response = await fetch(
            endpoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': payload.token
                },  
                body: JSON.stringify(payload.newData),
            }
        );

        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    } catch(err) {
        throw new Error(`There was the following problem: ${err} while updating user ${payload.userName}`);
    }
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