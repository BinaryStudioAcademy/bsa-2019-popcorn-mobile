import { fetchStories } from './../../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as storyService from './../../../services/story.service';

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

function* watchGetMessages() {
    yield takeEvery(fetchStories.TRIGGER, getStories)
}

export default function* messagesSaga() {
    yield all([
        watchGetMessages(),
    ])
};
