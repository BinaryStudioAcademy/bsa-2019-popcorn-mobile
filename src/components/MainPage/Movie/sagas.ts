import {
	fetchMovies,
	fetchGenres,
	fetchFiltred
} from './../../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as movieService from './../../../services/movie.service';
import callWebApi from '../../../helpers/webApi.helper';
import config from '../../../config';

export function* getMovies() {
	try {
		yield put(fetchMovies.request());

		const response = yield call(callWebApi, {
			endpoint: config.API_URL + '/api/movie',
			method: 'GET'
		});

		console.log(response);
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

export function* getGenres() {
	try {
		yield put(fetchGenres.request());

		const response = yield call(callWebApi, {
			endpoint: config.API_URL + '/api/movie/advanced/get-genres',
			method: 'GET'
		});

		yield put(fetchGenres.success(response));
	} catch (error) {
		yield put(fetchGenres.failure(error.message));
	} finally {
		yield put(fetchGenres.fulfill());
	}
}
function* watchGetGenres() {
	yield takeEvery(fetchGenres.TRIGGER, getGenres);
}

export function* getFiltredMovies(action) {
	console.log(action);
	try {
		yield put(fetchFiltred.request());

		const response = yield call(callWebApi, {
			endpoint: config.API_URL + '/api/movie/advanced',
			method: 'POST',
			body: action.payload
		});

		console.log(response);
		yield put(fetchMovies.success(response));
	} catch (error) {
		yield put(fetchFiltred.failure(error.message));
	} finally {
		yield put(fetchFiltred.fulfill());
	}
}
function* watchFetchFiltredMovies() {
	yield takeEvery(fetchFiltred.TRIGGER, getFiltredMovies);
}

export default function* messagesSaga() {
	yield all([watchGetMovies(), watchGetGenres(), watchFetchFiltredMovies()]);
}
