import {
    fetchCollectionDetails,
    fetchCollectionPreview,
    saveCollection,
	deleteCollection,
	fetchCollections
} from '../../redux/routines';

interface IReducerState {
	loading: boolean;
	movieListsPreview?: Array<any>;
	movieListDetails?: any;
	selectedPreviewUserId?: string;
	collections?: Array<any>
}

const initialState: IReducerState = {
	loading: false,
	movieListsPreview: undefined,
	movieListDetails: undefined,
	selectedPreviewUserId: undefined,
	collections: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case fetchCollectionPreview.REQUEST:
			return { ...state, loading: true };

		case fetchCollectionPreview.SUCCESS:
			return {
				...state,
				loading: false,
				movieListsPreview: action.payload.movieListsPreview,
				selectedPreviewUserId: action.payload.selectedPreviewUserId
			};

		case deleteCollection.SUCCESS:
            const { movieListId } = action.payload;
            if (!state.movieListsPreview) return state;
			const prevMovieList = [...state.movieListsPreview];
			if (!state.collections)
			return {
				...state,
				movieListsPreview: prevMovieList.filter(
					movieList => movieList.id !== movieListId
				)
			};
			const prevCollections = [...state.collections];
			return {
				...state,
				movieListsPreview: prevMovieList.filter(
					collection => collection.id !== movieListId
				),
				collections: prevCollections.filter(
					collection => collection.id !== movieListId
				)
			}

		case saveCollection.REQUEST:
			return {
				...state,
				loading: true
			};

		case saveCollection.SUCCESS:
			if (!state.movieListsPreview || !state.collections) return state;
			return {
				...state,
				movieListsPreview: [
					action.payload.newMovieList,
					...state.movieListsPreview
				],
				collections: [
					action.payload.newMovieList,
					...state.collections
				],
				loading: false
			};

		case fetchCollectionDetails.REQUEST:
			return {
				...state,
				loading: true
			};

		case fetchCollectionDetails.SUCCESS:
			return {
				...state,
				loading: false,
				movieListDetails: action.payload.movieListDetails
			};
		case fetchCollections.REQUEST: 
			return {
				...state,
				loading: true
			};
		case fetchCollections.SUCCESS: {
			return {
				...state,
				loading: false,
				collections: action.payload
			}
		}
		default:
			return state;
	}
};