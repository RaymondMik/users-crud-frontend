export const getUserFromStorage = () => {
    const storageState = sessionStorage.getItem('user');
    // Storage null
    if (storageState === null) return {};
    const parsedStorageState = JSON.parse(storageState);
    
    return parsedStorageState;
};

export const saveUserToStorage = (userData) => {
    try {
        sessionStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
        return {};
    }
};

export const deleteUserFromStorage = () => {
    try {
        sessionStorage.removeItem('user');
    } catch (err) {
        return {};
    }
};