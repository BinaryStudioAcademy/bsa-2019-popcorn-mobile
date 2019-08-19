import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composeEnhancers = composeWithDevTools || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middlewares))
);

export default store;

sagaMiddleware.run(rootSaga);
