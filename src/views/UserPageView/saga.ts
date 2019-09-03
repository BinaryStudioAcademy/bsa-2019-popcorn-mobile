import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    fetchUserById
} from '../../redux/routines';
import config from '../../config';
import webApi from '../../helpers/webApi.helper';

function* getSelectedUser(action) {
	try {
        yield put(fetchUserById.request())
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + '/api/user/' + action.payload
		});

		yield put(fetchUserById.success(data.data));
	} catch (e) {
		console.log('fetch user by id: ' + e.message);
	}
}

function* watchFetchUserById() {
    yield takeEvery(fetchUserById.trigger, getSelectedUser);
} 

export default function* userProfileSaga() {
	yield all([
		watchFetchUserById(),
	]);
}

