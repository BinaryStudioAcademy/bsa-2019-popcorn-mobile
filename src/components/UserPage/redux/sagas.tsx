import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	fetchUserEvents as fetchEvents,
	fetchUserSurveys,
	fetchUserTops
} from '../../../redux/routines';
import config from '../../../config';
import webApi from '../../../helpers/webApi.helper';

function* getEvents(action) {
	try {
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event/visitor/' + action.payload,
			method: 'GET'
		});

		yield put({
			type: fetchEvents.SUCCESS,
			payload: {
				events: data
			}
		});
	} catch (e) {
		yield put(fetchEvents.failure(e.message));
	} finally {
		yield put(fetchEvents.fulfill());
	}
}

function* getUserSurveys(action) {
	console.warn(action.payload);
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/surveys/user/' + action.payload
		});
		console.warn(data);
		yield put({
			type: fetchUserSurveys.SUCCESS,
			payload: {
				surveys: data,
				loading: false
			}
		});
	} catch (e) {
		console.warn('survey saga fetch surveys: ', e.message);
	}
}

function* getUserTops(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + `/api/top/user/${action.payload}`
		});
		yield put({
			type: fetchUserTops.SUCCESS,
			payload: {
				tops: data
			}
		});
	} catch (e) {
		console.warn('feed saga fetch tops: ', e.message);
	}
}

function* watchFetchEvents() {
	yield takeEvery(fetchEvents.trigger, getEvents);
}

function* watchFetchUserSurveys() {
	yield takeEvery(fetchUserSurveys.trigger, getUserSurveys);
}

function* watchFetchUserTops() {
	yield takeEvery(fetchUserTops.trigger, getUserTops);
}

export default function* eventsSaga() {
	yield all([
		watchFetchEvents(),
		watchFetchUserSurveys(),
		watchFetchUserTops()
	]);
}
