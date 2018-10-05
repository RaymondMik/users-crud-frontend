import { combineReducers } from 'redux';
import rootData from './rootReducer';
import usersList from './getUsersReducer';
import userData from './signUserInReducer';

const reducers = combineReducers({
    rootData,
    usersList,
    userData
});

// selectors used in mapStateToProps()
export const getRoot = (state) => state.rootData;
export const getUserData = (state) => state.userData;
export const getUsers = (state) => state.usersList;

export default reducers;