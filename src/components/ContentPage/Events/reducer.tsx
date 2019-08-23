import {
	fetchEvents,
	createEventVisitor,
	updateEventVisitor,
	deleteEventVisitor
} from '../../../redux/routines';

const initialState = {
	events: [],
	error: '',
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
		case createEventVisitor.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case updateEventVisitor.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case deleteEventVisitor.FAILURE:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
}
