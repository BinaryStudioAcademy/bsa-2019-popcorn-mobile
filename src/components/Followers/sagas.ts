import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    fetchFollowers,
    fetchFollowersCount,
    fetchFollowed,
    fetchFollowedCount,
    changeStatus,
    fetchStatus
} from '../../redux/routines';
import webApi from '../../helpers/webApi.helper';

export function* getFollowersCount(action) {
	try {
        yield put(fetchFollowersCount.request());
		const { count } = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/follow/${action.payload.userId}/followers/count`
		});

		yield put(fetchFollowersCount.success(count));
	} catch (e) {
		console.log('follow saga fetch followers count:', e.message);
	}
}

function* watchFetchFollowersCount() {
	yield takeEvery(fetchFollowersCount.trigger, getFollowersCount);
}

export function* getFollowers(action) {
	try {
        yield put(fetchFollowers.request())
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/follow/${action.payload.userId}/followers`
		});

		yield put(fetchFollowers.success({
            userId: action.payload.userId,
            data
        }));
	} catch (e) {
		console.log('follow saga fetch followings count:', e.message);
	}
}

function* watchFetchFollowers() {
	yield takeEvery(fetchFollowers.trigger, getFollowers);
}

export function* getFollowedCount(action) {
	try {
        yield put(fetchFollowedCount.request());
		const { count } = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/follow/${action.payload.userId}/followings/count`
		});

		yield put(fetchFollowedCount.success(count));
	} catch (e) {
		console.log('follow saga fetch followings:', e.message);
	}
}

function* watchFetchFollowingsCount() {
	yield takeEvery(fetchFollowedCount.trigger, getFollowedCount);
}

export function* getFollowed(action) {
	try {
        yield put(fetchFollowed.request())
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/follow/${action.payload.userId}/followings`
		});

		yield put(fetchFollowed.success({
            userId: action.payload.userId,
            data
        }));
	} catch (e) {
		console.log('follow saga fetch followers:', e.message);
	}
}

function* watchFetchFollowings() {
	yield takeEvery(fetchFollowed.trigger, getFollowed);
}

export function* getStatus(action) {
	try {
        yield put(fetchStatus.request());
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: `/api/follow/${action.payload.userId}/${action.payload.followerId}`
		});

		yield put(fetchStatus.success(data));
	} catch (e) {
		console.log('follow saga check status:', e.message);
	}
}

function* watchCheckStatus() {
	yield takeEvery(fetchStatus.trigger, getStatus);
}

export function* updateStatus(action) {
	try {
        yield put(changeStatus.request());
		yield call(webApi, {
			method: 'POST',
			endpoint: `/api/follow`,
			body: {
				userId: action.payload.userId,
				followerId: action.payload.followerId
			}
		});

		yield put(fetchStatus.trigger({
            userId: action.payload.userId,
            followerId: action.payload.followerId
        }));

		yield put(fetchFollowersCount.trigger({
            userId: action.payload.followerId
        }));
	} catch (e) {
		console.log('follow saga change status:', e.message);
	}
}

function* watchChangeStatus() {
	yield takeEvery(changeStatus.trigger, updateStatus);
}

export default function* follow() {
	yield all([
		watchFetchFollowersCount(),
		watchFetchFollowingsCount(),
		watchFetchFollowers(),
		watchFetchFollowings(),
		watchCheckStatus(),
		watchChangeStatus()
	]);
}