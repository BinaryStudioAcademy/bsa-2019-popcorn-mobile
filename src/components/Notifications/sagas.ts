import { all, call, put, takeEvery, actionChannel } from 'redux-saga/effects';
import { fetchNotifications, readNotification } from '../../redux/routines';
import config from '../../config';
import webApi from '../../helpers/webApi.helper';

function* fetchUnreadNotifications(action) {
	try {
		yield put(fetchNotifications.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/notification/' + action.payload,
			method: 'GET'
		});
		yield put(fetchNotifications.success(data));
	} catch (e) {
		yield put(fetchNotifications.failure(e.message));
	} finally {
		yield put(fetchNotifications.fulfill());
	}
}

function* readUserNotification(action) {
	try {
		yield put(readNotification.request());
		const data = yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + `/api/notification/${action.payload.id}`
		});
		if (data) yield put(fetchNotifications(action.payload.userId))
	} catch (e) {
		console.log('notification saga readNotification: ', e.message);
	}
}

function* watchFetchNotifications() {
	yield takeEvery(fetchNotifications.trigger, fetchUnreadNotifications);
}

function* watchReadNotification() {
	yield takeEvery(readNotification.trigger, readUserNotification);
}

export default function* notification() {
	yield all([watchFetchNotifications(), watchReadNotification()]);
}