import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchTops } from '../../../redux/routines';
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
		yield put(fetchTops.failure(e.message));
	} finally {
		yield put(fetchTops.fulfill());
	}
}

function* watchFetchTops() {
	yield takeEvery(fetchTops.trigger, getTops);
}

export default function* topsSaga() {
	yield all([watchFetchTops()]);
}
