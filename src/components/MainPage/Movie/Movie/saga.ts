import { fetchMovie, fetchMovieStatus } from './../../../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as movieService from './../../../../services/movie.service';
import * as watchListService from './../../../../services/watchlist.service';
export function* getMovie(action) {
	try {
		yield put(fetchMovie.request());
		const response = yield call(movieService.getMovieById, action.payload.id);

		yield put(fetchMovie.success(response));
	} catch (error) {
		yield put(fetchMovie.failure(error.message));
	} finally {
		yield put(fetchMovie.fulfill());
	}
}

function* watchGetMovie() {
	yield takeEvery(fetchMovie.TRIGGER, getMovie);
}

export function* getMovieStatus(action) {
	try {
		const movieId = action.payload;
		const { status } = yield call(watchListService.fetchMovieStatus, movieId);

		yield put(fetchMovieStatus.success(status));
	} catch (error) {
		yield put(fetchMovieStatus.failure(error.message));
	} finally {
		yield put(fetchMovieStatus.fulfill());
	}
}

function* watchGetMovieStatus() {
	yield takeEvery(fetchMovieStatus.TRIGGER, getMovieStatus);
}

export default function* messagesSaga() {
	yield all([watchGetMovie(), watchGetMovieStatus()]);
}
