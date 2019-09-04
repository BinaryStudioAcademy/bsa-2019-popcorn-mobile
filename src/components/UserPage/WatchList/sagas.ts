import { fetchUserWatchList } from '../../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as watchListService from './../../../services/watchlist.service';
import {
	ADD_TO_WATCHLIST,
	REMOVE_FROM_WATCHLIST,
	UPDATE_WATCHLIST_ITEM
} from './actionTypes';

export function* fetchWatchList(action) {
	try {
		yield put(fetchUserWatchList.request());
		const userId = action.payload;
		const response = yield call(watchListService.getWatchlist, userId);

		yield put(fetchUserWatchList.success(response));
	} catch (error) {
		yield put(fetchUserWatchList.failure(error.message));
	} finally {
		yield put(fetchUserWatchList.fulfill());
	}
}

function* watchFetchWatchList() {
	yield takeEvery(fetchUserWatchList.TRIGGER, fetchWatchList);
}

export function* addToWatchList(action) {
	try {
		const { movieId, userId } = action.payload;
		yield call(watchListService.addToWatchlist, movieId);
		yield put(fetchUserWatchList(userId));
	} catch (error) {
		console.log(error);
	}
}

function* watchAddToWatchList() {
	yield takeEvery(ADD_TO_WATCHLIST, addToWatchList);
}

export function* removeFromWatchList(action) {
	try {
		const { id, userId } = action.payload;
		yield call(watchListService.removeWatchItem, id);
		yield put(fetchUserWatchList(userId));
	} catch (error) {
		console.log(error);
	}
}

function* watchRemoveFromWatchList() {
	yield takeEvery(REMOVE_FROM_WATCHLIST, removeFromWatchList);
}

export function* updateWatchListItem(action) {
	try {
		const { id, userId } = action.payload;
		yield call(watchListService.updateWatchItem, id);
		yield put(fetchUserWatchList(userId));
	} catch (error) {
		console.log(error);
	}
}

function* watchUpdateWatchListItem() {
	yield takeEvery(UPDATE_WATCHLIST_ITEM, updateWatchListItem);
}

export default function* messagesSaga() {
	yield all([
		watchFetchWatchList(),
		watchAddToWatchList(),
		watchRemoveFromWatchList(),
		watchUpdateWatchListItem()
	]);
}
