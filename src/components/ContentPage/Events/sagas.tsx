import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	fetchEvents,
	createEventVisitor,
	updateEventVisitor,
	deleteEventVisitor,
	fetchEventById
} from '../../../redux/routines';
import config from '../../../config';
import webApi from '../../../helpers/webApi.helper';

function* getEvents() {
	try {
		yield put(fetchEvents.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event',
			method: 'GET'
		});
		yield put(fetchEvents.success(data));
	} catch (e) {
		yield put(fetchEvents.failure(e.message));
	} finally {
		yield put(fetchEvents.fulfill());
	}
}

function* watchFetchEvents() {
	yield takeEvery(fetchEvents.trigger, getEvents);
}

function* getEventById(action) {
	try {
		yield put(fetchEventById.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event/' + action.payload,
			method: 'GET'
		});
		yield put(fetchEventById.success(data));
	} catch (e) {
		yield put(fetchEventById.failure(e.message));
	} finally {
		yield put(fetchEventById.fulfill());
	}
}

function* watchFetchEventById() {
	yield takeEvery(fetchEventById.trigger, getEventById);
}

function* createVisitor(action) {
	try {
		yield put(createEventVisitor.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event/visitor',
			method: 'POST',
			body: {
				...action.payload
			}
		});
		yield put(fetchEvents.trigger());
		yield put(fetchEventById.trigger(action.payload.eventId));
	} catch (e) {
		yield put(createEventVisitor.failure(e.message));
	} finally {
		yield put(createEventVisitor.fulfill());
	}
}

function* watchCreateVisitor() {
	yield takeEvery(createEventVisitor.trigger, createVisitor);
}

function* updateVisitor(action) {
	try {
		yield put(updateEventVisitor.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event/visitor',
			method: 'PUT',
			body: {
				...action.payload
			}
		});
		yield put(fetchEvents.trigger());
		yield put(fetchEventById.trigger(action.payload.eventId));
	} catch (e) {
		yield put(updateEventVisitor.failure(e.message));
	} finally {
		yield put(updateEventVisitor.fulfill());
	}
}

function* watchUpdateVisitor() {
	yield takeEvery(updateEventVisitor.trigger, updateVisitor);
}

function* deleteVisitor(action) {
	try {
		yield put(deleteEventVisitor.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/event/visitor/' + action.payload.visitorId,
			method: 'DELETE'
		});
		yield put(fetchEvents.trigger());
		yield put(fetchEventById.trigger(action.payload.eventId));
	} catch (e) {
		yield put(deleteEventVisitor.failure(e.message));
	} finally {
		yield put(deleteEventVisitor.fulfill());
	}
}

function* watchDeleteVisitor() {
	yield takeEvery(deleteEventVisitor.trigger, deleteVisitor);
}

export default function* eventsSaga() {
	yield all([
		watchFetchEvents(),
		watchCreateVisitor(),
		watchDeleteVisitor(),
		watchUpdateVisitor(),
		watchFetchEventById()
	]);
}
