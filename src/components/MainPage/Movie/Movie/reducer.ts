import { fetchMovie, fetchMovieStatus } from './../../../../redux/routines';
import IMovie from './../IMovie';

const initialState: {
	movie: IMovie | null;
	error: Error | null;
	loading: boolean;
	status: null | string;
} = {
	status: null,
	movie: null,
	error: null,
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case fetchMovie.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchMovie.SUCCESS:
			return {
				...state,
				movie: action.payload
			};
		case fetchMovie.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case fetchMovie.FULFILL:
			return {
				...state,
				loading: false
			};
		case fetchMovieStatus.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchMovieStatus.SUCCESS:
			return {
				...state,
				status: action.payload
			};
		case fetchMovieStatus.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case fetchMovieStatus.FULFILL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}
