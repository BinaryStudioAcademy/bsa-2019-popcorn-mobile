import { all, call, put, takeEvery } from 'redux-saga/effects';
import { login, register, fetchUser, sendDeviceToken } from '../../redux/routines';
import config from '../../config';
import webApi from '../../helpers/webApi.helper';
import { Storage } from '../../helpers/storage.helper';

function* fetchLogin(action) {
	try {
		yield put(login.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/auth/login',
			method: 'POST',
			parse: true,
			body: {
				...action.payload
			}
		});

		if (data.token) {
			Storage.set('token', data.token);
			yield put(login.success({ user: data.user[0] }));
		} else yield put(login.failure(data.message));
	} catch (e) {
		console.log('auth saga login', e);
	}
}

function* fetchUserByToken(action) {
	try {
		yield put(fetchUser.request());
		let user = yield call(webApi, {
			endpoint: config.API_URL + '/api/auth/user',
			method: 'GET',
			parse: false
		});
		if (!user) {
			Storage.set('token', '');

			yield put(login.failure('You have been absent for a long time'));
		} else {
			user = yield call(user.json.bind(user));

			yield put(login.success({ user: user.data.user }));
		}
	} catch (e) {
		console.log('auth saga fetchUser:', e.message);
	}
}

function* fetchRegistration(action) {
	try {
		yield put(register.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/auth/register',
			method: 'POST',
			body: {
				...action.payload
			},
			parse: true
		});
		if (data.token) {
			Storage.set('token', data.token);

			yield put(login.success({ user: data.user[0] }));
		} else yield put(register.failure(data.message));
	} catch (e) {
		console.log('auth saga fetch registration:', e.message);
	}
}

function* sendToken(action) {
	try {
		console.log('token is sending');
		yield put(sendDeviceToken.request());
		const data = yield call(webApi, {
			endpoint: config.API_URL + '/api/auth/notification',
			method: 'PUT',
			body: {
				token: action.payload,
				type: 'mobile'
			}
		});
		if (data) {
			yield put(sendDeviceToken.success());
		}
	} catch (e) {
		console.log('auth saga send device token:', e.message);
		yield put(sendDeviceToken.failure(e.message));
	}
}

function* watchFetchLogin() {
	yield takeEvery(login.trigger, fetchLogin);
}

function* watchFetchUser() {
	yield takeEvery(fetchUser.trigger, fetchUserByToken);
}

function* watchFetchRegistration() {
	yield takeEvery(register.trigger, fetchRegistration);
}

function* watchSendToken() {
	yield takeEvery(sendDeviceToken.trigger, sendToken);
}

export default function* auth() {
	yield all([watchFetchLogin(), watchFetchUser(), watchFetchRegistration(), watchSendToken()]);
}
