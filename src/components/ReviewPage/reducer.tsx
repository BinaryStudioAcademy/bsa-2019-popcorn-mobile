import { getReviewsByMovieId, setReviewReaction } from '../../redux/routines';

const initialState = {
	reviews: [],
	error: '',
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case getReviewsByMovieId.TRIGGER:
			return {
				...state,
				loading: true
			};
		case getReviewsByMovieId.SUCCESS:
			return {
				...state,
				reviews: action.payload
			};
		case getReviewsByMovieId.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case getReviewsByMovieId.FULFILL:
			return {
				...state,
				loading: false
			};
		case setReviewReaction.SUCCESS:
			return {
				...state,
				updateReaction: action.payload
			};
		default:
			return state;
	}
}
