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
import chatReducer from '../views/Messages/reducer';
import userProfileReducer from '../views/UserPageView/reducer';
import followersReducer from '../components/Followers/reducer';
import watchListReducer from './../components/UserPage/WatchList/reducer';
import collectionsReducer from '../components/Collections/reducer';
import footerReducer from '../views/Footer/reducer';

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
	chat: chatReducer,
	userProfile: userProfileReducer,
	followers: followersReducer,
	watchList: watchListReducer,
	collections: collectionsReducer,
	footer: footerReducer
};

export default combineReducers({
	...reducers
});
