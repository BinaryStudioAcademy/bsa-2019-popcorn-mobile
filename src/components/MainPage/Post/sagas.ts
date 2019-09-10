import { fetchPosts } from '../../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as postService from './../../../services/post.service';
import webApi from '../../../helpers/webApi.helper';
import config from '../../../config';
import { SEND_POST, DELETE_POST } from './actionTypes';
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
	try {
		yield call(webApi, {
			method: 'POST',
			endpoint: config.API_URL + '/api/post/',
			body: { ...action.payload.post },
			parse: false
		});
	} catch (e) {
		console.log('profile saga fetch posts:', e.message);
	}
}

export function* deletePost(action) {
	try {
		yield call(postService.deletePost, action.payload.postId);
		yield put(fetchPosts());
	} catch (error) {
		console.log(error);
	}
}

function* watchDeletePost() {
	yield takeEvery(DELETE_POST, deletePost);
}

function* watchGetPosts() {
	yield takeEvery(fetchPosts.TRIGGER, getPosts);
}
function* watchSendPost() {
	yield takeEvery(SEND_POST, sendPost);
}

export default function* messagesSaga() {
	yield all([watchGetPosts(), watchSendPost(), watchDeletePost()]);
}
