import { combineReducers } from 'redux';
import rootData from './rootReducer';
import usersList from './getUsersReducer';
import userData from './signUserReducer';
import { reducer as formReducer } from 'redux-form';
import userPageFormReducer from './formReducer';

const reducers = combineReducers({
    rootData,
    usersList,
    userData,
    form: formReducer.plugin({
        userPage: userPageFormReducer
    })
});

// selectors used in mapStateToProps()
export const getRoot = (state) => state.rootData;
export const getUserData = (state) => state.userData;
export const getUsers = (state) => state.usersList;

export default reducers;