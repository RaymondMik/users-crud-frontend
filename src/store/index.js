import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import reducers from '../reducers';
import { getStateFromStorage, saveStateToStorage } from '../utilities/sessionStorageHandler';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
let store;
// add logger middleware in development only
if (process.env.NODE_ENV === 'development') middlewares.push(loggerMiddleware);

/**
 * Initialize the store
 * @returns {Object} Redux store.
 */
const initStore = () => {
	const storageState = getStateFromStorage();
	const state = storageState ? storageState : {};
	store = createStore(
		reducers,
		state,
		composeWithDevTools(
			applyMiddleware(...middlewares)
		)
	);

	store.subscribe(() => {
		saveStateToStorage({
			usersList: store.getState().usersList,
			userData: store.getState().userData
		});
	});

	// Webpack Hot Module Replacement API - runs only in development
	if (process.env.NODE_ENV === 'development' && module.hot) {
		module.hot.accept('../reducers', () => {
		  const nextReducers = require('../reducers').default;
		  store.replaceReducer(nextReducers);
		});
	}

	sagaMiddleware.run(rootSaga);

	return store;
};

export { initStore, store };