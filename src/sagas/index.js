import { call, put } from 'redux-saga/effects';
import { getData } from '../services';
import * as root from '../actions/rootActions';

const baseURL = 'https://users-crud-api.herokuapp.com';

export function* getRootSaga() {
    try {
        yield put(root.getRoot());
        const data = yield call(getData, `${baseURL}`, 'root');
        yield put(root.getRootSuccess(data));
    } catch(error) {
        yield put(root.getRootFailure(error));
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