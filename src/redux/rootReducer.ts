import { combineReducers } from 'redux';
import storyReducer from './../components/MainPage/Story/reducer';
import authReducer from '../components/Authorization/reducer';
import surveyReducer from '../components/ContentPage/Surveys/reducer';
import moviesReducer from '../components/MainPage/Movie/reducer';
import postReducer from '../components/MainPage/Post/reducer';
import userEventsReducer from '../components/UserPage/redux/reducer';
import eventsReducer from '../components/ContentPage/Events/reducer';
import movieReducer from '../components/MainPage/Movie/Movie/reducer';
import topsReducer from '../components/ContentPage/Tops/reducer';
import notificationReducer from '../components/Notifications/reducer';
import reviewsReducer from '../components/ReviewPage/reducer';
import userProfileReducer from '../views/UserPageView/reducer';

const reducers = {
	story: storyReducer,
	survey: surveyReducer,
	movies: moviesReducer,
	movie: movieReducer,
	post: postReducer,
	authorization: authReducer,
	userEvents: userEventsReducer,
	events: eventsReducer,
	tops: topsReducer,
	notifications: notificationReducer,
	reviews: reviewsReducer,
	userProfile: userProfileReducer,
};

export default combineReducers({
	...reducers
});
