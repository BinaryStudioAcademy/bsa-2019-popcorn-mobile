import { fetchUserWatchList } from './../../../redux/routines';

const initialState: {
	watchcList?: Array<any>;
	error: Error | null;
	loading: boolean;
} = {
	watchcList: undefined,
	error: null,
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case fetchUserWatchList.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchUserWatchList.SUCCESS:
			return {
				...state,
				watchcList: action.payload
			};
		case fetchUserWatchList.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case fetchUserWatchList.FULFILL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}
