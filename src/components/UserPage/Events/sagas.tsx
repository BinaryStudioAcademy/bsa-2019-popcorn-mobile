import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchUserEvents as fetchEvents } from '../../../redux/routines';
import config from '../../../config';
import webApi from '../../../helpers/webApi.helper';

function* getEvents(action) {
    try {
        yield put (fetchEvents.request());
        const data = yield call (webApi, {
			endpoint: config.API_URL + '/api/event/visitor/' + action.payload,
			method: 'GET'
        });
        yield put(fetchEvents.success(data));
    } catch(e) {
        yield put(fetchEvents.failure(e.message));
    } finally {
        yield put(fetchEvents.fulfill());
    }
} 

function* watchFetchEvents () {
    yield takeEvery(fetchEvents.trigger, getEvents);
}

export default function* eventsSaga() {
    yield all([watchFetchEvents()]);
}