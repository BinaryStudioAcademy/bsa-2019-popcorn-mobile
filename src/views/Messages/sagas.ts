import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
	FETCH_CHATS,
	FETCH_MESSAGES,
	SET_CHATS,
	SET_MESSAGES,
	CREATE_CHAT,
	CREATE_MESSAGE,
	DELETE_MESSAGE,
	UPDATE_MESSAGE,
	READ_MESSAGES,
	SET_NEW_CHAT
} from './actionTypes';
import webApi from '../../helpers/webApi.helper';
import config from '../../config';

export function* fetchChats(action) {
	try {
		const data = yield call(webApi, {
			method: 'GET',
			endpoint: config.API_URL + `/api/chat/${action.payload.userId}`
		});
		yield put({
			type: SET_CHATS,
			payload: {
				data
			}
		});
	} catch (e) {
		console.log('chat saga fetch chats:', e.message);
	}
}

function* watchFetchChats() {
	yield takeEvery(FETCH_CHATS, fetchChats);
}

export function* fetchMessages(action) {
	try {
		const resp = yield call(webApi, {
			method: 'PUT',
			endpoint:
				config.API_URL +
				`/api/chat/${action.payload.chatId}/${action.payload.userId}/read`
		});
		const messages = yield call(webApi, {
			method: 'GET',
			endpoint:
				config.API_URL +
				`/api/chat/${action.payload.userId}/${action.payload.chatId}`
		});

		yield put({
			type: SET_MESSAGES,
			payload: {
				messages,
				chatId: action.payload.chatId
			}
		});
		yield put({
			type: READ_MESSAGES,
			payload: {
				userId: action.payload.user1Id,
				chatId: action.payload.chatId
			}
		});
	} catch (e) {
		console.log('chat saga fetch messages:', e.message);
	}
}

function* watchFetchMessages() {
	yield takeEvery(FETCH_MESSAGES, fetchMessages);
}

export function* createChat(action) {
	try {
		const response = yield call(webApi, {
			method: 'POST',
			endpoint: config.API_URL + `/api/chat/`,
			body: {
				user1Id: action.payload.user1Id,
				user2Id: action.payload.user2Id
			}
		});
		if (action.payload.body) {
			yield put({
				type: CREATE_MESSAGE,
				payload: {
					userId: action.payload.user1Id,
					chatId: response.chat.id,
					body: { ...action.payload.body }
				}
			});
		}
		yield put({
			type: FETCH_CHATS,
			payload: {
				userId: action.payload.user1Id
			}
		});
		yield put({
			type: SET_NEW_CHAT,
			payload: {
				chatId: response.chat.id
			}
		});
	} catch (e) {
		console.log('chat saga create chat:', e.message);
	}
}

function* watchCreateChat() {
	yield takeEvery(CREATE_CHAT, createChat);
}

export function* createMessage(action) {
	let newBody =
		typeof action.payload.body === 'string'
			? { body: action.payload.body }
			: { ...action.payload.body };
	try {
		yield call(webApi, {
			method: 'POST',
			endpoint:
				config.API_URL +
				`/api/chat/${action.payload.userId}/${action.payload.chatId}`,
			body: newBody
		});
	} catch (e) {
		console.log('chat saga create message:', e.message);
	}
}

function* watchCreateMessage() {
	yield takeEvery(CREATE_MESSAGE, createMessage);
}

export function* deleteMessage(action) {
	try {
		yield call(webApi, {
			method: 'DELETE',
			endpoint: config.API_URL + `/api/chat/${action.payload.id}`
		});
	} catch (e) {
		console.log('chat saga delete message:', e.message);
	}
}

function* watchDeleteMessage() {
	yield takeEvery(DELETE_MESSAGE, deleteMessage);
}

export function* updateMessage(action) {
	try {
		const response = yield call(webApi, {
			method: 'PUT',
			endpoint: config.API_URL + `/api/chat/${action.payload.id}`,
			body: { body: action.payload.body }
		});
	} catch (e) {
		console.log('chat saga delete message:', e.message);
	}
}

function* watchUpdateMessage() {
	yield takeEvery(UPDATE_MESSAGE, updateMessage);
}

export default function* chat() {
	yield all([
		watchFetchChats(),
		watchFetchMessages(),
		watchCreateChat(),
		watchCreateMessage(),
		watchUpdateMessage(),
		watchDeleteMessage()
	]);
}
