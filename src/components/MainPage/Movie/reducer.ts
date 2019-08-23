import { fetchMovies } from './../../../redux/routines';
import IMovie from './IMovie';

const initialState: {
	movies: Array<IMovie> | null;
	error: Error | null;
	loading: boolean;
} = {
	movies: null,
	error: null,
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case fetchMovies.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchMovies.SUCCESS:
			return {
				...state,
				movies: action.payload
			};
		case fetchMovies.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case fetchMovies.FULFILL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}
