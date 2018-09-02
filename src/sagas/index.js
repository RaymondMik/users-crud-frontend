import { call, put } from 'redux-saga/effects';
import { getData } from '../services';
import * as actions from '../actions';

export function* getUsersSaga() {
    try {
        yield put(actions.getUsers());
        const cryptos = yield call(getData, 'https://warm-atoll-11335.herokuapp.com/users', 'users');
        console.log(88, cryptos);
        yield put(actions.getUsersSuccess(cryptos));
    } catch(error) {
        yield put(actions.getUsersFailure(error));
    }
}

// Sagas that will be called when the store is initialised
function* rootSaga() {
    yield getUsersSaga();
}

export default rootSaga;