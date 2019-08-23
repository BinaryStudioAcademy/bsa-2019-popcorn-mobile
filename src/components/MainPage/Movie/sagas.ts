import { fetchMovies } from './../../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as movieService from './../../../services/movie.service';

export function* getMovies() {
	try {
		yield put(fetchMovies.request());
		const response = yield call(movieService.getAllMovies);

		yield put(fetchMovies.success(response));
	} catch (error) {
		yield put(fetchMovies.failure(error.message));
	} finally {
		yield put(fetchMovies.fulfill());
	}
}

function* watchGetMovies() {
	yield takeEvery(fetchMovies.TRIGGER, getMovies);
}

export default function* messagesSaga() {
	yield all([watchGetMovies()]);
}
