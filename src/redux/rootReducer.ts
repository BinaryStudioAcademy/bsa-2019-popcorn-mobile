import { combineReducers } from 'redux';
import storyReducer from './../components/MainPage/Story/reducer';
import authReducer from '../components/Authorization/reducer';
import moviesReducer from '../components/MainPage/Movie/reducer';
import postReducer from '../components/MainPage/Post/reducer';
import userEventsReducer from '../components/UserPage/Events/reducer';
import eventsReducer from '../components/ContentPage/Events/reducer';
import movieReducer from '../components/MainPage/Movie/Movie/reducer';

const reducers = {
	story: storyReducer,
	movies: moviesReducer,
	movie: movieReducer,
	post: postReducer,
	authorization: authReducer,
	userEvents: userEventsReducer,
	events: eventsReducer
};

export default combineReducers({
	...reducers
});
