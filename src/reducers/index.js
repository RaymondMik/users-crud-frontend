import { combineReducers } from 'redux';
import root from './rootReducer';
import users from './usersReducer';

const reducers = combineReducers({
    root,
    users
});

// selectors used in mapStateToProps()
export const getRoot = (state) => state.root;
export const getUsers = (state) => state.users;

export default reducers;