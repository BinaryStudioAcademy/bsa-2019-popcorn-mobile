import { combineReducers } from 'redux';
import storyReducer from './../components/MainPage/Story/reducer';
import authReducer from '../components/Authorization/reducer';
import surveyReducer from '../components/ContentPage/Surveys/reducer';
import postReducer from '../components/MainPage/Post/reducer';
import userEventsReducer from '../components/UserPage/Events/reducer';

const reducers = {
	story: storyReducer,
	survey: surveyReducer,
	post: postReducer,
	authorization: authReducer,
	userEvents: userEventsReducer
};

export default combineReducers({
	...reducers
});
