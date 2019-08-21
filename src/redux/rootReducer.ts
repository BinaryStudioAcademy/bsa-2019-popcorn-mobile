import { combineReducers } from 'redux';
import storyReducer from './../components/MainPage/Story/reducer';
import authReducer from '../components/Authorization/reducer';
import movieReducer from '..//components/MainPage/Movie/reducer';
import postReducer from '../components/MainPage/Post/reducer';

const reducers = {
	story: storyReducer,
	movie: movieReducer,
	post: postReducer,
};

export default combineReducers({
	...reducers,
	authorization: authReducer
});
