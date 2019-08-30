import { fetchNotifications } from '../../redux/routines';
import { ADD_NOTIFICATION } from './actionTypes';

const initialState = {
	unreadNotifications: [],
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case fetchNotifications.REQUEST:
			return {
				...state,
				loading: true
			}
		case fetchNotifications.SUCCESS:
			return {
				...state,
				loading: false,
				unreadNotifications: action.payload
			};
		case ADD_NOTIFICATION:
			const unreadNotifications = state.unreadNotifications
				? [action.payload.notification, ...state.unreadNotifications]
				: [action.payload.notification];
			return {
				...state,
				unreadNotifications
			};
		default:
			return state;
	}
};