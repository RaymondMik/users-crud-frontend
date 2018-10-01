import { combineReducers } from 'redux';
import root from './rootReducer';
import users from './getUsersReducer';
import userData from './logUserInReducer';

const reducers = combineReducers({
    root,
    users,
    userData
});

// selectors used in mapStateToProps()
export const getRoot = (state) => state.root;
export const getUsers = (state) => state.users;

export default reducers;