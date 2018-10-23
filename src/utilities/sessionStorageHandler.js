export const getStateFromStorage = () => {
    const storageState = sessionStorage.getItem('state');
    // Storage null
    if (storageState === null) return {};
    const parsedStorageState = JSON.parse(storageState);
    
    return parsedStorageState;
};

export const saveStateToStorage = (state) => {
    try {
        sessionStorage.setItem('state', JSON.stringify(state));
    } catch (err) {
        return {};
    }
};

export const deleteStateFromStorage = () => {
    try {
        sessionStorage.removeItem('state');
    } catch (err) {
        return {};
    }
};