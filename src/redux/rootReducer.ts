import { combineReducers } from 'redux';
import storyReducer from './../components/MainPage/Story/reducer';
import authReducer from '../components/Authorization/reducer';

const reducers = {
	story: storyReducer
};

export default combineReducers({
	...reducers,
	authorization: authReducer
});
