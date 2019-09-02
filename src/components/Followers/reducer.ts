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
	followSystem: {},
	followStatus: {}
};

export default function(state = initialState, action) {
	let newState;
	switch (action.type) {
		case fetchFollowersCount.SUCCESS:
			return {
				...state,
				followersCount: action.payload
			};
		case fetchFollowedCount.SUCCESS:
			return {
				...state,
				followingsCount: action.payload
			};
		case fetchFollowers.SUCCESS:
			return {
				...state,
				followSystem: {
					...state.followSystem,
					[action.payload.userId]: {
						...state.followSystem[action.payload.userId],
						followers: action.payload.data
					}
				}
			};
		case fetchFollowed.SUCCESS:
			return {
				...state,
				followSystem: {
					...state.followSystem,
					[action.payload.userId]: {
						...state.followSystem[action.payload.userId],
						followings: action.payload.data
					}
				}
			};
		case fetchStatus.SUCCESS:
			return {
				...state,
				followStatus: { ...action.payload }
			};
		default:
			return state;
	}
}