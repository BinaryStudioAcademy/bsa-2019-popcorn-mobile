import {
    fetchCollectionDetails,
    fetchCollectionPreview,
    saveCollection,
    deleteCollection
} from '../../redux/routines';

interface IReducerState {
	isLoading: boolean;
	movieListsPreview?: Array<any>;
	movieListDetails?: any;
	selectedPreviewUserId?: string;
}

const initialState: IReducerState = {
	isLoading: false,
	movieListsPreview: undefined,
	movieListDetails: undefined,
	selectedPreviewUserId: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case fetchCollectionPreview.REQUEST:
			return { ...state, isLoading: true };

		case fetchCollectionPreview.SUCCESS:
			return {
				...state,
				isLoading: false,
				movieListsPreview: action.payload.movieListsPreview,
				selectedPreviewUserId: action.payload.selectedPreviewUserId
			};

		case deleteCollection:
            const { movieListId } = action.payload;
            if (!state.movieListsPreview) return state;
			const prevMovieList = [...state.movieListsPreview];
			return {
				...state,
				movieListsPreview: prevMovieList.filter(
					movieList => movieList.id !== movieListId
				)
			};

		case saveCollection.REQUEST:
			return {
				...state,
				isLoading: true
			};

		case saveCollection.SUCCESS:
            if (!state.movieListsPreview) return state;
			return {
				...state,
				movieListsPreview: [
					action.payload.newMovieList,
					...state.movieListsPreview
				],
				isLoading: false
			};

		case fetchCollectionDetails.REQUEST:
			return {
				...state,
				isLoading: true
			};

		case fetchCollectionDetails.SUCCESS:
			return {
				...state,
				isLoading: false,
				movieListDetails: action.payload.movieListDetails
			};

		default:
			return state;
	}
};