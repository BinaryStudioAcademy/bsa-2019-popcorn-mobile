import { all, takeEvery, call, put } from '@redux-saga/core/effects';
import {
	FETCH_SURVEYS,
	FETCH_USER_SURVEYS,
	SET_SURVEYS,
	ADD_SURVEY,
	UPDATE_SURVEY,
	DELETE_SURVEY,
	RECREATE_SURVEY
} from './actionTypes';
import webApi from '../../../helpers/webApi.helper';

import config from '../../../config';
import { setArrangementInSurveys } from '../../../services/userSurveys.service';

// export function* fetchUserSurveys(action) {
// 	try {
// 		const data = yield call(webApi, {
// 			method: 'GET',
// 			endpoint: config.API_URL + '/api/surveys/user/' + action.payload.userId
// 		});
// 		if (data) {
// 			setArrangementInSurveys(data);
// 		}
// 		yield put({
// 			type: SET_SURVEYS,
// 			payload: {
// 				surveys: data
// 			}
// 		});
// 	} catch (e) {
// 		console.log('survey saga fetch surveys: ', e.message);
// 	}
// }

// function* watchFetchUser() {
// 	yield takeEvery(FETCH_USER_SURVEYS, fetchUserSurveys);
// }

export function* fetchSurveys() {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/surveys'
		});
		if (data) {
			setArrangementInSurveys(data);
		}
		yield put({
			type: SET_SURVEYS,
			payload: {
				surveys: data
			}
		});
	} catch (e) {
		console.log('survey saga fetch surveys: ', e.message);
	}
}

function* watchFetch() {
	yield takeEvery(FETCH_SURVEYS, fetchSurveys);
}

// export function* addSurvey(action) {
// 	try {
// 		const data = yield call(webApi, {
// 			method: 'POST',
// 			endpoint: config.API_URL + '/api/surveys',
// 			body: {
// 				...action.payload.data
// 			}
// 		});
// 		if (data) yield put({ type: FETCH_SURVEYS });
// 	} catch (e) {
// 		console.log('survey saga create survey: ', e.message);
// 	}
// }

// function* watchAdd() {
// 	yield takeEvery(ADD_SURVEY, addSurvey);
// }

// export function* updateSurvey(action) {
// 	try {
// 		const data = yield call(webApi, {
// 			method: 'PUT',
// 			endpoint: config.API_URL + '/api/surveys/' + action.payload.id,
// 			body: {
// 				...action.payload.data
// 			}
// 		});
// 		if (data) yield put({ type: FETCH_SURVEYS });
// 	} catch (e) {
// 		console.log('survey saga update survey: ', e.message);
// 	}
// }

// function* watchUpdate() {
// 	yield takeEvery(UPDATE_SURVEY, updateSurvey);
// }

// function* deleteSurvey(action) {
// 	try {
// 		const data = yield call(webApi, {
// 			method: 'DELETE',
// 			endpoint: config.API_URL + '/api/surveys/' + action.payload.id
// 		});
// 		if (data) yield put({ type: FETCH_SURVEYS });
// 	} catch (e) {
// 		console.log('survey saga delete survey: ', e.message);
// 	}
// }

// function* watchDelete() {
// 	yield takeEvery(DELETE_SURVEY, deleteSurvey);
// }

// function* recreateSurvey(action) {
// 	try {
// 		const deletedData = yield call(webApi, {
// 			method: 'DELETE',
// 			endpoint: config.API_URL + '/api/surveys/' + action.payload.id
// 		});
// 		if (deletedData) {
// 			const data = yield call(webApi, {
// 				method: 'POST',
// 				endpoint: config.API_URL + '/api/surveys',
// 				body: {
// 					...action.payload.data
// 				}
// 			});
// 			if (data) yield put({ type: FETCH_SURVEYS });
// 		}
// 	} catch (e) {
// 		console.log('survey saga recreate survey: ', e.message);
// 	}
// }

// function* watchRecreate() {
// 	yield takeEvery(RECREATE_SURVEY, recreateSurvey);
// }

export default function* survey() {
	yield all([
		// watchFetchUser(),
		watchFetch()
		// watchAdd(),
		// watchUpdate(),
		// watchDelete(),
		// watchRecreate()
	]);
}
