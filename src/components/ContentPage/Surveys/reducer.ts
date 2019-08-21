import { SET_SURVEYS, SET_SURVEY_BYID } from './actionTypes';

const initialState = {
	surveys: undefined,
	survey: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_SURVEYS:
			return {
				...state,
				surveys: action.payload.surveys
			};
		case SET_SURVEY_BYID:
			return {
				...state,
				survey: action.payload.survey
			};
		default:
			return state;
	}
}
