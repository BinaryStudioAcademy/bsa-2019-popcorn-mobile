import { all } from 'redux-saga/effects';
import authSaga from '../components/Authorization/saga';

export default function* rootSaga() {
	yield all([
		authSaga()
	]);
}
