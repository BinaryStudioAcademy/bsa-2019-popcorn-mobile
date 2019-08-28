import {
	fetchUserEvents as fetchEvents,
	fetchUserSurveys,
	fetchUserTops
} from '../../../redux/routines';

const initialState = {
	events: [],
	surveys: null,
	tops: null
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
		case fetchUserSurveys.success:
			return {
				...state,
				surveys: action.payload.surveys
			};
		case fetchUserTops.success:
			return {
				...state,
				surveys: action.payload.tops
			};
		default:
			return state;
	}
}
