import { combineReducers } from 'redux';
import users from './usersReducer';

const reducers = combineReducers({
    users
});

// selectors used in mapStateToProps()
export const getUsers = (state) => state.users;

export default reducers;