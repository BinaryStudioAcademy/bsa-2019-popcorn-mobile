import {
	FETCH_CHATS,
	FETCH_MESSAGES,
	CREATE_CHAT,
	CREATE_MESSAGE,
	DELETE_MESSAGE,
	UPDATE_MESSAGE,
	ADD_MESSAGE_STORE,
	DELETE_MESSAGE_STORE,
	UPDATE_MESSAGE_STORE,
	READ_MESSAGES
} from './actionTypes';

export const fetchChats = userId => {
	return {
		type: FETCH_CHATS,
		payload: {
			userId
		}
	};
};

export const fetchMessages = (userId, chatId) => {
	return {
		type: FETCH_MESSAGES,
		payload: {
			userId,
			chatId
		}
	};
};

export const createChat = (user1Id, user2Id) => {
	return {
		type: CREATE_CHAT,
		payload: {
			user1Id,
			user2Id
		}
	};
};

export const createMessage = (userId, chatId, body) => {
	console.log('actions message= ', userId, chatId, body);
	return {
		type: CREATE_MESSAGE,
		payload: {
			userId,
			chatId,
			body
		}
	};
};

export const deleteMessage = (id, body) => {
	console.log('deleteMessage', body);

	return {
		type: DELETE_MESSAGE,
		payload: {
			id
		}
	};
};

export const updateMessage = (id, body) => {
	console.log('update message body', body);
	return {
		type: UPDATE_MESSAGE,
		payload: {
			id,
			body
		}
	};
};

export const addMessage = message => {
	console.log('socket add');
	return {
		type: ADD_MESSAGE_STORE,
		payload: {
			message
		}
	};
};

export const deleteMessageStore = (chatId, messageId) => {
	return {
		type: DELETE_MESSAGE_STORE,
		payload: {
			chatId,
			messageId
		}
	};
};

export const updateMessageStore = (chatId, message) => {
	console.log('update message message', message);
	return {
		type: UPDATE_MESSAGE_STORE,
		payload: {
			chatId,
			message
		}
	};
};

export const readMessages = (chatId, userId) => {
	return {
		type: READ_MESSAGES,
		payload: {
			chatId,
			userId
		}
	};
};
