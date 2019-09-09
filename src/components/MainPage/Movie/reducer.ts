import {
	fetchMovies,
	fetchGenres,
	fetchFiltred
} from './../../../redux/routines';
import IMovie from './IMovie';

const initialState: {
	movies: Array<IMovie> | null;
	error: Error | null;
	loading: boolean;
} = {
	movies: null,
	error: null,
	loading: false,
	filters: {
		nameValue: '',
		genresValues: [],
		ratingValues: [],
		yearValues: {
			startDate: '1900-01-01',
			endDate: '2019-09-06'
		},
		descriptionValue: '',
		castValues: '',
		crewValues: [],
		durationValues: []
	}
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
				movies: action.payload,
				error: null
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
		case fetchGenres.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchGenres.SUCCESS:
			return {
				...state,
				genres: action.payload
			};
		case fetchGenres.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case fetchGenres.FULFILL:
			return {
				...state,
				loading: false
			};
		case fetchFiltred.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchFiltred.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case fetchFiltred.FULFILL:
			return {
				...state,
				loading: false
			};
		case 'SET_FILTERS':
			return {
				...state,
				filters: action.payload.filters
			};
		default:
			return state;
	}
}
