import { ADD_NOTIFICATION } from './actionTypes';

export const addNotification = notification => {
	console.log(notification);
	return {
		type: ADD_NOTIFICATION,
		payload: {
			notification
		}
	};
};
