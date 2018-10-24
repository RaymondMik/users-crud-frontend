import { call, put, takeLatest } from 'redux-saga/effects';
import {fork} from 'redux-saga/effects';
import { getData, postData, patchData } from '../services';
import * as rootActions from '../actions/rootActions';
import * as signUserActions from '../actions/signUserActions';
import * as getUsersActions from '../actions/getUsersActions';
import * as updateUserActions from '../actions/updateUserActions';
import { deleteStateFromStorage } from '../utilities/sessionStorageHandler';
import globalUrl from '../utilities/globalUrl';

export function* getRootSaga() {
    try {
        const data = yield call(getData, `${globalUrl}`, {}, 'root');
        yield put(rootActions.getRootSuccess(data));
    } catch(error) {
        yield put(rootActions.getRootFailure(error));
    }
}

export function* signUserInSaga(signInData) {
    try {
        const {userData} = signInData;
        const user = yield call(postData, `${globalUrl}/users/sign-in`, userData, 'signIn');
        yield put(signUserActions.signUserInSuccess(user));
    } catch(error) {
        yield put(signUserActions.signUserInFailure(error));
    }
}

export function* signUserUpSaga(signUpData) {
    try {
        const {userData} = signUpData;
        yield call(postData, `${globalUrl}/users/sign-up`, userData, 'signUp');
        yield put(signUserActions.signUserUpSuccess());
    } catch(error) {
        yield put(signUserActions.signUserUpFailure(error));
    }
}

export function* signUserOutSaga(signOutData) {
    try {
        yield call(postData, `${globalUrl}/users/sign-out/${signOutData._id}`, signOutData.token, 'signOut');
        yield deleteStateFromStorage();
        yield put(signUserActions.signUserOutSuccess());
        yield put(signUserActions.resetSignUserState());
    } catch(error) {
        yield put(signUserActions.signUserOutFailure(error));
    }
}

export function* getUsersListSaga(getUserAction) {
    try {
        const {token} = getUserAction;
        const usersList = yield call(getData, `${globalUrl}/users`, token, 'users');
        yield put(getUsersActions.getUsersSuccess(usersList));
    } catch(error) {
        yield put(getUsersActions.getUsersFailure(error));
    }
}

export function* updateUserSaga(updateUserAction) {
    try {
        const {payload: {newData, token, _id}} = updateUserAction;
        console.log(1111, newData, token, _id);
        const updatedUser = yield call(patchData, `${globalUrl}/users/update/${_id}`, {newData, token});
        // GET USER DATA FROM API
        yield put(updateUserActions.updateUserSuccess(updatedUser));
        // get updated usersList
        yield put(getUsersActions.getUsers(token));
    } catch(error) {
        yield put(updateUserActions.updateUserFailure(error));
    }
}

function* watchGetRoot() {
    yield takeLatest(rootActions.GET_ROOT, getRootSaga); 
}

function* watchSignUserIn() {
    yield takeLatest(signUserActions.SIGN_USER_IN, signUserInSaga); 
}

function* watchSignUserUp() {
    yield takeLatest(signUserActions.SIGN_USER_UP, signUserUpSaga); 
}

function* watchSignUserOut() {
    yield takeLatest(signUserActions.SIGN_USER_OUT, signUserOutSaga); 
}

function* watchGetUsersList() {
    yield takeLatest(getUsersActions.GET_USERS, getUsersListSaga); 
}

function* watchUpdateUser() {
    yield takeLatest(updateUserActions.UPDATE_USER, updateUserSaga); 
}

// Sagas that will be called when the store is initialised
function* rootSaga() {
    yield fork(watchGetRoot);
    yield fork(watchSignUserIn);
    yield fork(watchSignUserUp);
    yield fork(watchSignUserOut);
    yield fork(watchGetUsersList);
    yield fork(watchUpdateUser);
}

export default rootSaga;