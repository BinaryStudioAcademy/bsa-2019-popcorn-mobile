import { fetchPosts } from '../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as postService from '../../services/post.service';

export function* getUsersPosts(action) {
	try {
		yield put(fetchPosts.request());
		const response = yield call(() =>
			postService.getUsersPosts(action.payload.id)
		);

		yield put(fetchPosts.success(response));
	} catch (error) {
		yield put(fetchPosts.failure(error.message));
	} finally {
		yield put(fetchPosts.fulfill());
	}
}

function* watchGetPosts() {
	yield takeEvery(fetchPosts.TRIGGER, getUsersPosts);
}

export default function* messagesSaga() {
	yield all([watchGetPosts()]);
}
