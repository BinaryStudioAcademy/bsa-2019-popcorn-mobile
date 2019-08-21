import { all, takeEvery, call, put } from '@redux-saga/core/effects';
import {
	FETCH_SURVEYS,
	FETCH_USER_SURVEYS,
	SET_SURVEYS,
	ADD_SURVEY,
	UPDATE_SURVEY,
	DELETE_SURVEY,
	RECREATE_SURVEY,
	GET_SURVEY_BYID,
	SET_SURVEY_BYID
} from './actionTypes';
import webApi from '../../../helpers/webApi.helper';

import config from '../../../config';
import {
	setArrangementInSurveys,
	transformDataToProps
} from '../../../services/userSurveys.service';
// import console = require('console');

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

function* getSurveyById(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/surveys/' + action.payload.id
		});

		// console.log(data);
		// const formattedData = transformDataToProps([data])[0];
		// console.log(formattedData);
		// if (data)
		yield put({
			type: SET_SURVEY_BYID,
			payload: { survey: data, loading: false }
		});
	} catch (e) {
		console.log('survey saga get by id: ', e);
	}
}

function* watchgetSurveyById() {
	yield takeEvery(GET_SURVEY_BYID, getSurveyById);
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
		watchFetch(),
		watchgetSurveyById()
		// watchAdd(),
		// watchUpdate(),
		// watchDelete(),
		// watchRecreate()
	]);
}
