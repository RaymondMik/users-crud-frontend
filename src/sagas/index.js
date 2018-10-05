import { call, put, takeLatest } from 'redux-saga/effects';
import { getData, postData } from '../services';
import * as rootActions from '../actions/rootActions';
import * as signInActions from '../actions/signUserInActions';
import {saveUserToStorage} from '../utilities/sessionStorageHandler';
import globalUrl from '../utilities/globalUrl';

export function* getRootSaga() {
    try {
        yield put(rootActions.getRoot());
        const data = yield call(getData, `${globalUrl}`, 'root');
        yield put(rootActions.getRootSuccess(data));
    } catch(error) {
        yield put(rootActions.getRootFailure(error));
    }
}

export function* signUserInSaga(signInData) {
    try {
        const {userData} = signInData;
        const user = yield call(postData, `${globalUrl}/users/login`, userData, 'signIn');
        yield saveUserToStorage(user);
        yield put(signInActions.signUserInSuccess(user));
    } catch(error) {
        yield put(signInActions.signUserInFailure(error));
    }
}

function* watchLogUserIn() {
    yield takeLatest('SIGN_USER_IN', signUserInSaga); 
}

/*export function* getUsersSaga() {
    try {
        yield put(actions.getUsers());
        const users = yield call(getData, `${baseURL}/users`, 'users');
        yield put(actions.getUsersSuccess(users));
    } catch(error) {
        yield put(actions.getUsersFailure(error));
    }
}*/

// Sagas that will be called when the store is initialised
function* rootSaga() {
    yield getRootSaga();
    yield watchLogUserIn();
}

export default rootSaga;