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
	SET_SURVEY_BYID,
	POST_ANSWERS
} from './actionTypes';
import webApi from '../../../helpers/webApi.helper';

import config from '../../../config';
import {
	setArrangementInSurveys,
	transformDataToProps
} from '../../../services/userSurveys.service';

export function* fetchSurveys() {
	try {
		yield put({
			type: SET_SURVEYS,
			payload: { loading: true }
		});
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
				surveys: data,
				loading: false
			}
		});
	} catch (e) {
		console.log('survey saga fetch surveys: ', e);
	}
}

function* watchFetch() {
	yield takeEvery(FETCH_SURVEYS, fetchSurveys);
}

function* getSurveyById(action) {
	try {
		yield put({
			type: SET_SURVEY_BYID,
			payload: { loading: true }
		});
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/surveys/' + action.payload.id
		});

		const surveys = [data];

		if (data) {
			setArrangementInSurveys(surveys);
		}

		const formattedData = transformDataToProps(surveys);

		if (data)
			yield put({
				type: SET_SURVEY_BYID,
				payload: { survey: formattedData[0], loading: false }
			});
	} catch (e) {
		console.log('survey saga get by id: ', e);
	}
}

function* watchgetSurveyById() {
	yield takeEvery(GET_SURVEY_BYID, getSurveyById);
}

function* postAnswers(action) {
	try {
		yield all(
			action.payload.data.map(answer =>
				call(webApi, {
					method: 'POST',
					endpoint: config.API_URL + '/api/surveys/answer',
					body: {
						...answer
					}
				})
			)
		);

		yield put({ type: FETCH_SURVEYS });
	} catch (e) {
		console.log('survey saga post answers: ', e.message);
	}
}

function* watchPostAnswers() {
	yield takeEvery(POST_ANSWERS, postAnswers);
}

export default function* survey() {
	yield all([watchFetch(), watchgetSurveyById(), watchPostAnswers()]);
}
