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
	const { newStory, userId } = action.payload.story;
	try {
		const data = yield call(webApi, {
			method: 'POST',
			endpoint: config.API_URL + '/api/story/',
			// body: { ...action.payload.post },
			body: {
				userId,
				...newStory,
				activityId: newStory.activity && newStory.activity.id
				// parse: false
			}
		});
		alert(JSON.stringify(data));
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
