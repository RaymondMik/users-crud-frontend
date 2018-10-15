import { call, put, takeLatest } from 'redux-saga/effects';
import {fork} from 'redux-saga/effects';
import { getData, postData } from '../services';
import * as rootActions from '../actions/rootActions';
import * as signUserActions from '../actions/signUserActions';
import * as getUsersActions from '../actions/getUsersActions';
import {saveUserToStorage, deleteUserFromStorage} from '../utilities/sessionStorageHandler';
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
        yield saveUserToStorage(user);
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
        yield deleteUserFromStorage();
        yield put(signUserActions.signUserOutSuccess());
        yield put(signUserActions.resetSignUserState());
    } catch(error) {
        yield put(signUserActions.signUserOutFailure(error));
    }
}

export function* getUsersList(getUserAction) {
    try {
        const {token} = getUserAction;
        const usersList = yield call(getData, `${globalUrl}/users`, token, 'users');
        yield put(getUsersActions.getUsersSuccess(usersList));
    } catch(error) {
        yield put(getUsersActions.getUsersFailure(error));
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
    yield takeLatest(getUsersActions.GET_USERS, getUsersList); 
}

// Sagas that will be called when the store is initialised
function* rootSaga() {
    yield fork(watchGetRoot);
    yield fork(watchSignUserIn);
    yield fork(watchSignUserUp);
    yield fork(watchSignUserOut);
    yield fork(watchGetUsersList);
}

export default rootSaga;