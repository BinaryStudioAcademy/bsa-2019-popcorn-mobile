import { combineReducers } from 'redux';
import storyReducer from './../components/MainPage/Story/reducer';
import authReducer from '../components/Authorization/reducer';
import postReducer from '../components/MainPage/Post/reducer';

const reducers = {
	story: storyReducer,
	post: postReducer,
};

export default combineReducers({
	...reducers,
	authorization: authReducer
});
