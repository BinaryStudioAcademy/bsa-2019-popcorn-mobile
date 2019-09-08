import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchTops, fetchTop } from '../../../redux/routines';
import config from '../../../config';
import webApi from '../../../helpers/webApi.helper';

function* getTops() {
	try {
		yield put(fetchTops.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/top/extended',
			method: 'GET'
		});
		yield put(fetchTops.success(data));
	} catch (e) {
		console.log('saga fetch tops: ', e.message);
		yield put(fetchTops.failure(e.message));
	} finally {
		yield put(fetchTops.fulfill());
	}
}

function* watchFetchTops() {
	yield takeEvery(fetchTops.trigger, getTops);
}

function* getTop(action) {
	try {
		yield put(fetchTop.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/top/' + action.payload,
			method: 'GET'
		});
		yield put(fetchTop.success(data));
	} catch(e) {
		console.log('saga fetch top: ', e.message);
	} finally {
		yield put(fetchTop.fulfill());
	}
}

function* watchFetchTop() {
	yield takeEvery(fetchTop.trigger, getTop);
}

export default function* topsSaga() {
	yield all([ watchFetchTops(), watchFetchTop() ]);
}
