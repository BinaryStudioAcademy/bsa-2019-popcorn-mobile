import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    fetchCollectionDetails,
    fetchCollectionPreview,
    deleteCollection,
	saveCollection,
	fetchCollections
} from '../../redux/routines';
import webApi from '../../helpers/webApi.helper';
import config from '../../config';

function* saveMovieList(action) {
	const { movieList } = action.payload;
	try {
        yield put(saveCollection.request());
		const newMovieList = yield call(webApi, {
			method: 'POST',
			endpoint: config.API_URL + '/api/movie-list',
			body: { ...movieList }
		});

		yield put(saveCollection.success({ newMovieList }));
	} catch (e) {
		console.log(e.message);
	}
}

function* fetchMovieListsPreview(action) {
	const { userId } = action.payload;
	try {
        yield put(fetchCollectionPreview.request());
		const movieListsPreview = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + `/api/movie-list/${userId}`
		});

		yield put(fetchCollectionPreview.success({ movieListsPreview, selectedPreviewUserId: userId }));
	} catch (e) {
		console.log(e.message);
	}
}

function* deleteMovieList(action) {
	const { movieListId } = action.payload;
	try {
        yield put(deleteCollection.request())
		yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + `/api/movie-list/${movieListId}`
		});
		yield put(deleteCollection.success({ movieListId }));
	} catch (e) {
		console.log(e.message);
	}
}

function* fetchMovieListDetails(action) {
	const { movieListId } = action.payload;
	try {
        yield put(fetchCollectionDetails.request());
		const movieListDetails = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + `/api/movie-list/details/${movieListId}`
		});

		yield put(fetchCollectionDetails.success({ movieListDetails }));
	} catch (e) {
		console.log(e.message);
	}
}

function* getCollections() {
	try {
        yield put(fetchCollections.request());
		const collections = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + `/api/movie-list`
		});

		yield put(fetchCollections.success(collections));
	} catch (e) {
		console.log(e.message);
	}
}

function* watchFetchCollections() {
	yield takeEvery(fetchCollections.trigger, getCollections);
}

function* watchSaveMovieList() {
	yield takeEvery(saveCollection.trigger, saveMovieList);
}

function* watchFetchListsPreview() {
	yield takeEvery(fetchCollectionPreview.trigger, fetchMovieListsPreview);
}

function* watchDeleteMovieList() {
	yield takeEvery(deleteCollection.trigger, deleteMovieList);
}

function* watchFetchMovieListDetails() {
	yield takeEvery(fetchCollectionDetails.trigger, fetchMovieListDetails);
}

export default function* collections() {
	yield all([
		watchSaveMovieList(),
		watchFetchListsPreview(),
		watchDeleteMovieList(),
		watchFetchMovieListDetails(),
		watchFetchCollections()
	]);
}