import { fetchPosts } from '../../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as postService from './../../../services/post.service';
import webApi from '../../../helpers/webApi.helper';
import config from '../../../config';
import { SEND_POST } from './actionTypes';
export function* getPosts() {
	try {
		yield put(fetchPosts.request());
		const response = yield call(postService.getAllPosts);

		yield put(fetchPosts.success(response));
	} catch (error) {
		yield put(fetchPosts.failure(error.message));
	} finally {
		yield put(fetchPosts.fulfill());
	}
}

export function* sendPost(action) {
	console.warn(action.payload);
	// try {
	// 	const data = yield call(webApi, {
	// 		method: 'POST',
	// 		endpoint: config.API_URL + '/api/post/',
	// 		body: { ...action.payload.post },
	// 		parse: false
	// 	});
	// 	alert(JSON.stringify(data));
	// } catch (e) {
	// 	console.log('profile saga fetch posts:', e.message);
	// 	alert(JSON.stringify(e.message));
	// }
}

function* watchGetPosts() {
	yield takeEvery(fetchPosts.TRIGGER, getPosts);
}
function* watchSendPost() {
	yield takeEvery(SEND_POST, sendPost);
}

export default function* messagesSaga() {
	yield all([watchGetPosts(), watchSendPost()]);
}
