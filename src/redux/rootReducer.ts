import { combineReducers } from 'redux';
import storyReducer from './../components/MainPage/Story/reducer';
import authReducer from '../components/Authorization/reducer';
import movieReducer from '..//components/MainPage/Movie/reducer';

const reducers = {
	story: storyReducer,
	movie: movieReducer,
};

export default combineReducers({
	...reducers,
	authorization: authReducer
});
