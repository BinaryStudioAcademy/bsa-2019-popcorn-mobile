import { all } from 'redux-saga/effects';
import authSaga from '../components/Authorization/saga';
import StorySaga from './../components/MainPage/Story/sagas';
import MoviesSaga from './../components/MainPage/Movie/sagas';
import PostSaga from './../components/MainPage/Post/sagas';
import EventSaga from '../components/UserPage/Events/sagas';
import survey from '../components/ContentPage/Surveys/saga';
import UserEventsSaga from '../components/UserPage/Events/sagas';
import MovieSaga from './../components/MainPage/Movie/Movie/saga';

export default function* rootSaga() {
	yield all([
		StorySaga(),
		authSaga(),
		MoviesSaga(),
		PostSaga(),
		EventSaga(),
		survey(),
		UserEventsSaga(),
		MovieSaga()
	]);
}
