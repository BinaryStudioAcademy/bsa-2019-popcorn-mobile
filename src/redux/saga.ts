import { all } from 'redux-saga/effects';
import authSaga from '../components/Authorization/saga';
import StorySaga from './../components/MainPage/Story/sagas';
import MoviesSaga from './../components/MainPage/Movie/sagas';
import PostSaga from './../components/MainPage/Post/sagas';
import EventSaga from '../components/ContentPage/Events/sagas';
import survey from '../components/ContentPage/Surveys/saga';
import UserEventsSaga from '../components/UserPage/redux/sagas';
import MovieSaga from './../components/MainPage/Movie/Movie/saga';
import TopSaga from '../components/ContentPage/Tops/sagas';
import NotificationSaga from '../components/Notifications/sagas';
import ReviewSaga from '../components/ReviewPage/sagas';
import WatchlistSaga from '../components/UserPage/WatchList/sagas';

export default function* rootSaga() {
	yield all([
		StorySaga(),
		authSaga(),
		MoviesSaga(),
		PostSaga(),
		EventSaga(),
		survey(),
		UserEventsSaga(),
		MovieSaga(),
		TopSaga(),
		NotificationSaga(),
		ReviewSaga(),
		WatchlistSaga()
	]);
}
