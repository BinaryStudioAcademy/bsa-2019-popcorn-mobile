import { fetchMovie } from './../../../../redux/routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as movieService from './../../../../services/movie.service';

export function* getMovie(action) {
    try {
        yield put(fetchMovie.request());
        const response = yield call(movieService.getMovieById, action.payload.id);

        yield put(fetchMovie.success(response));
    } catch (error) {
        yield put(fetchMovie.failure(error.message));
    } finally {
        yield put(fetchMovie.fulfill());
    }
}

function* watchGetMovie() {
    yield takeEvery(fetchMovie.TRIGGER, getMovie)
}

export default function* messagesSaga() {
    yield all([
        watchGetMovie(),
    ])
};
