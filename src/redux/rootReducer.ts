import { combineReducers } from 'redux';
import storyReducer from './../components/MainPage/Story/reducer';
import authReducer from '../components/Authorization/reducer';
import surveyReducer from '../components/ContentPage/Surveys/reducer';

const reducers = {
	story: storyReducer,
	survey: surveyReducer
};

export default combineReducers({
	...reducers,
	authorization: authReducer
});
