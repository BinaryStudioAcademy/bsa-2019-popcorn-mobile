import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getReviewsByMovieId, setReviewReaction } from '../../redux/routines';
import config from '../../config';
import webApi from '../../helpers/webApi.helper';

function* fetchMovieReviews(id) {
	console.log(id);
	try {
		yield put(getReviewsByMovieId.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/review/movie/' + id.payload,
			method: 'GET'
		});
		yield put(getReviewsByMovieId.success(data));
	} catch (e) {
		yield put(getReviewsByMovieId.failure(e.message));
	} finally {
		yield put(getReviewsByMovieId.fulfill());
	}
}

function* watchfetchMovieReviews() {
	yield takeEvery(getReviewsByMovieId.trigger, fetchMovieReviews);
}

function* setReviewReact(data) {
	const { isLike, reviewId } = data.payload;
	try {
		yield put(setReviewReaction.request());
		const response = yield call(webApi, {
			endpoint: config.API_URL + '/api/review/reaction',
			method: 'POST',
			body: { isLike, reviewId }
		});
		yield put(setReviewReaction.success(response));
	} catch (e) {
		console.log(e);
		yield put(setReviewReaction.failure(e.message));
	} finally {
		yield put(setReviewReaction.fulfill());
	}
}

function* watchSetReviewReact() {
	yield takeEvery(setReviewReaction.trigger, setReviewReact);
}

export default function* reviewsSaga() {
	yield all([watchfetchMovieReviews(), watchSetReviewReact()]);
}
