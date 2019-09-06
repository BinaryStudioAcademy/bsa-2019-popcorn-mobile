import { fetchStories } from './../../../redux/routines';
import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as storyService from './../../../services/story.service';
import webApi from '../../../helpers/webApi.helper';
import config from '../../../config';
import { SEND_STORY, SEND_VOTING, CHANGE_ACTIVITY } from './actionTypes';
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
		const a = yield call(webApi, {
			method: 'POST',
			endpoint: config.API_URL + '/api/story/',
			body: { ...story }
		});
		alert(JSON.stringify(a));
	} catch (e) {
		console.warn('profile saga fetch stories:', e.message);
		alert(JSON.stringify(e.message));
	}
}

export function* sendVoting({ payload }) {
	// console.log('action', action);
	const options = payload.voting.options.map(option => ({
		text: option.body,
		voted: option.voted
	}));
	try {
		const data = yield call(webApi, {
			method: 'POST',
			endpoint: config.API_URL + '/api/voting',
			body: {
				...payload.voting,
				options
			}
		});
		console.log('data', data);
		const calldata = yield call(webApi, {
			method: 'POST',
			endpoint: config.API_URL + `/api/voting/${data.id}/options`,
			body: {
				options: payload.voting.options
			}
		});
		const newActivity = { id: data.id, name: data.header };
		console.log('calldata', calldata);
		const final = yield put({
			type: CHANGE_ACTIVITY,
			payload: {
				type: 'voting',
				activity: newActivity
			}
		});

		const updatedStory = {
			...payload.newStory,
			userId: payload.userId,
			type: data.type,
			activity: newActivity,
			caption: ''
		};

		yield put({
			type: SEND_STORY,
			payload: {
				story: updatedStory
			}
		});
		console.log('final', final);
	} catch (e) {
		console.log('story modal creating vote: ', e.message);
	}
}

export default function* messagesSaga() {
	yield all([
		takeLatest(fetchStories.TRIGGER, getStories),
		takeLatest(SEND_STORY, sendStory),
		takeLatest(SEND_VOTING, sendVoting)
	]);
}
