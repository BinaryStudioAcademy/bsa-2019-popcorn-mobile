import { fetchStories } from './../../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as storyService from './../../../services/story.service';
import webApi from '../../../helpers/webApi.helper';
import config from '../../../config';
import { SEND_STORY } from './actionTypes';
export function* getStories() {
	try {
		yield put(fetchStories.request());
		const response = yield call(storyService.getAllStories);

		yield put(fetchStories.success(response));
	} catch (error) {
		yield put(fetchStories.failure(error.message));
	} finally {
		yield put(fetchStories.fulfill());
	}
}

export function* sendStory(action) {
	const { story } = action.payload;
	try {
		yield call(webApi, {
			method: 'POST',
			endpoint: config.API_URL + '/api/story/',
			body: { ...story }
		});
	} catch (e) {
		console.warn('profile saga fetch stories:', e.message);
		alert(JSON.stringify(e.message));
	}
}
function* watchGetMessages() {
	yield takeEvery(fetchStories.TRIGGER, getStories);
}
function* watchSendStory() {
	yield takeEvery(SEND_STORY, sendStory);
}
export default function* messagesSaga() {
	yield all([watchGetMessages(), watchSendStory()]);
}
