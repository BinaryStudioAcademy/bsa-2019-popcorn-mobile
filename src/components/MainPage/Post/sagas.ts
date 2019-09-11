import { fetchPosts, fetchPost } from '../../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as postService from './../../../services/post.service';
import webApi from '../../../helpers/webApi.helper';
import config from '../../../config';
import {
	SEND_POST,
	DELETE_POST,
	REACT_POST,
	CREATE_COMMENT
} from './actionTypes';
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

export function* getPost(action) {
	try {
		yield put(fetchPost.request());
		const response = yield call(postService.getPostById, action.payload);

		yield put(fetchPost.success(response));
	} catch (error) {
		yield put(fetchPost.failure(error.message));
	} finally {
		yield put(fetchPost.fulfill());
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

export function* reactPost(action) {
	try {
		const { userId, type, postId } = action.payload;
		yield call(postService.reactPost, userId, type, postId);
	} catch (error) {
		console.log(error);
	}
}

export function* createComment(action) {
	const { userId, text, postId } = action.payload;
	try {
		yield call(postService.commentPost, userId, text, postId);
	} catch (e) {
		console.log('createComment: ', e.message);
	}
}

export function* watchCommentPost() {
	yield takeEvery(CREATE_COMMENT, createComment);
}

export function* watchReactPost() {
	yield takeEvery(REACT_POST, reactPost);
}

function* watchDeletePost() {
	yield takeEvery(DELETE_POST, deletePost);
}

function* watchGetPosts() {
	yield takeEvery(fetchPosts.TRIGGER, getPosts);
}

function* watchGetPost() {
	yield takeEvery(fetchPost.TRIGGER, getPost);
}

function* watchSendPost() {
	yield takeEvery(SEND_POST, sendPost);
}

export default function* messagesSaga() {
	yield all([
		watchGetPosts(),
		watchGetPost(),
		watchSendPost(),
		watchDeletePost(),
		watchReactPost(),
		watchCommentPost()
	]);
}
