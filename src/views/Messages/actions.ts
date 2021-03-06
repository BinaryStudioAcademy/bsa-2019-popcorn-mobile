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
	READ_MESSAGES,
	ADD_UNREAD_MESSAGE,
	UNSET_NEW_CHAT
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

export const createChat = (user1Id, user2Id, body) => {
	return {
		type: CREATE_CHAT,
		payload: {
			user1Id,
			user2Id,
			body
		}
	};
};

export const createMessage = (userId, chatId, body) => {
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
	return {
		type: DELETE_MESSAGE,
		payload: {
			id
		}
	};
};

export const updateMessage = (id, body) => {
	return {
		type: UPDATE_MESSAGE,
		payload: {
			id,
			body
		}
	};
};

export const addMessage = (chatId, message) => {
	return {
		type: ADD_MESSAGE_STORE,
		payload: {
			message,
			chatId
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

export const addUnreadMessage = (chatId, message) => {
	return {
		type: ADD_UNREAD_MESSAGE,
		payload: {
			message,
			chatId
		}
	};
};

export const unsetNewChat = () => {
	return {
		type: UNSET_NEW_CHAT,
		payload: {}
	};
};
