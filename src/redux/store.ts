import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composeEnhancers = composeWithDevTools || compose;

const initialState = {}

const store = composeEnhancers(applyMiddleware(...middlewares))(createStore)(persistedReducer, initialState)
const persistor = persistStore(store)

export { persistor, store }
sagaMiddleware.run(rootSaga);




