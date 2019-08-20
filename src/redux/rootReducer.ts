import { combineReducers } from 'redux';
import authReducer from '../components/Authorization/reducer';

const reducers = {};

export default combineReducers({
	...reducers,
	authorization: authReducer
});
