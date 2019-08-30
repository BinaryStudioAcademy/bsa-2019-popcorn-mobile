import { ADD_NOTIFICATION } from './actionTypes';

export const addNotification = notification => {
	return {
		type: ADD_NOTIFICATION,
		payload: {
			notification
		}
	};
};
