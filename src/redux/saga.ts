import { all } from 'redux-saga/effects';
import authSaga from '../components/Authorization/saga';
import StorySaga from './../components/MainPage/Story/sagas';
import MoviesSaga from './../components/MainPage/Movie/sagas';
import PostSaga from './../components/MainPage/Post/sagas';
import MovieSaga from './../components/MainPage/Movie/Movie/saga';
import EventSaga from '../components/UserPage/Events/sagas';

export default function* rootSaga() {
	yield all([
		StorySaga(),
		authSaga(),
		MoviesSaga(),
		PostSaga(),
		MovieSaga(),
		EventSaga()
	]);
}
