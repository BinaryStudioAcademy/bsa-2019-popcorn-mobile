import {
	fetchUserEvents as fetchEvents,
	fetchUserSurveys,
	fetchUserTops
} from '../../../redux/routines';

const initialState = {
	events: null,
	surveys: null,
	tops: null,
	loading: false
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
				events: action.payload.events,
				loading: false
			};
		case fetchEvents.FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		case fetchEvents.FULFILL:
			return {
				...state,
				loading: false
			};
		case fetchUserSurveys.SUCCESS:
			return {
				...state,
				surveys: action.payload.surveys,
				loading: false
			};
		case fetchUserTops.SUCCESS:
			return {
				...state,
				tops: action.payload.tops,
				loading: false
			};
		case fetchUserTops.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchUserSurveys.TRIGGER:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
