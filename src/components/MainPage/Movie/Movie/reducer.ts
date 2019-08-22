import { fetchMovie } from './../../../../redux/routines';
import IMovie from './../IMovie';

const initialState: {
    movie: IMovie | null;
    error: Error | null;
    loading: boolean;
} = {
    movie: null,
    error: null,
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case fetchMovie.TRIGGER:
            return {
                ...state,
                loading: true,
            };
        case fetchMovie.SUCCESS:
            return {
                ...state,
                movie: action.payload,
            };
        case fetchMovie.FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case fetchMovie.FULFILL:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}