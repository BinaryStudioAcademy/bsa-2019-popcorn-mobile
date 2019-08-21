import { all } from 'redux-saga/effects';
import authSaga from '../components/Authorization/saga';
import StorySaga from './../components/MainPage/Story/sagas';
import MovieSaga from './../components/MainPage/Movie/sagas';

export default function* rootSaga() {
	yield all([
		StorySaga(),
		authSaga(),
		MovieSaga(),
	]);
}
