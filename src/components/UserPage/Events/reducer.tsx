import { fetchUserEvents as fetchEvents } from '../../../redux/routines';

const initialState = {
	events: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case fetchEvents.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchEvents.SUCCESS:
			return {
				...state,
				events: action.payload
			};
		case fetchEvents.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case fetchEvents.FULFILL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}
