import { combineReducers } from 'redux';
import storyReducer from './../components/MainPage/Story/reducer';
import authReducer from '../components/Authorization/reducer';
import postReducer from '../components/MainPage/Post/reducer';
import userEventsReducer from '../components/UserPage/Events/reducer';

const reducers = {
	story: storyReducer,
	post: postReducer,
	authorization: authReducer,
	userEvents: userEventsReducer
};

export default combineReducers({
	...reducers
});
