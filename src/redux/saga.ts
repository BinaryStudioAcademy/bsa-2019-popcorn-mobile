import { all } from 'redux-saga/effects';
import authSaga from '../components/Authorization/saga';
import StorySaga from './../components/MainPage/Story/sagas';
import PostSaga from './../components/MainPage/Post/sagas';
import EventSaga from '../components/UserPage/Events/sagas';
import survey from '../components/ContentPage/Surveys/saga';

export default function* rootSaga() {
	yield all([StorySaga(), authSaga(), PostSaga(), EventSaga(), survey()]);
}
