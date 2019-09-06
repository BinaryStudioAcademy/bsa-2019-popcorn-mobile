import {
	fetchStatus,
	fetchFollowed,
	fetchFollowedCount,
	fetchFollowers,
	fetchFollowersCount
} from '../../redux/routines';

const initialState = {
	followersCount: undefined,
	followedCount: undefined,
	followed: undefined,
	followers: undefined,
	followStatus: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case fetchFollowersCount.REQUEST:
			return {
				...state,
				loading: true
			};
		case fetchFollowersCount.SUCCESS:
			return {
				...state,
				followersCount: action.payload,
				loading: false
			};
		case fetchFollowedCount.REQUEST:
			return {
				...state,
				loading: true
			};
		case fetchFollowedCount.SUCCESS:
			return {
				...state,
				followedCount: action.payload,
				loading: false
			};
		case fetchFollowers.REQUEST:
			return {
				...state,
				loading: true
			};
		case fetchFollowers.SUCCESS:
			return {
				...state,
				followers: action.payload.data,
				loading: false
			};
		case fetchFollowed.REQUEST:
			return {
				...state,
				loading: true
			};
		case fetchFollowed.SUCCESS:
			return {
				...state,
				followed: action.payload.data,
				loading: false
			};
		case fetchStatus.REQUEST:
			return {
				...state,
				loading: true
			};
		case fetchStatus.SUCCESS:
			return {
				...state,
				followStatus: { ...action.payload },
				loading: false
			};
		default:
			return state;
	}
}
