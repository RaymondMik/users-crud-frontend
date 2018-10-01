import { call, put } from 'redux-saga/effects';
import { getData, postData } from '../services';
import * as root from '../actions/rootActions';
import * as login from '../actions/logUserInActions';
import globalUrl from '../utilities/globalUrl';

export function* getRootSaga() {
    try {
        yield put(root.getRoot());
        const data = yield call(getData, `${globalUrl}`, 'root');
        yield put(root.getRootSuccess(data));
    } catch(error) {
        yield put(root.getRootFailure(error));
    }
}

export function* logUserInSaga() {
    try {
        yield put(login.logUserIn());
        const users = yield call(postData, `${globalUrl}/users/login`, 'log user in');
        yield put(login.logUserInSuccess(users));
    } catch(error) {
        yield put(login.logUserInFailure(error));
    }
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
    //yield getUsersSaga();
}

export default rootSaga;