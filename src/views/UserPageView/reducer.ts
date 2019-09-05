import { fetchUserById, clearUserInfo } from '../../redux/routines';

const initialState = {
	loading: false,
	selectedUser: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case fetchUserById.REQUEST:
			return {
				...state,
				loading: true
			};
		case fetchUserById.SUCCESS:
			return {
				...state,
				selectedUser: action.payload.user,
				loading: false
			};
		case clearUserInfo.TRIGGER:
			return {
				...state,
				selectedUser: {}
			};
		default:
			return state;
	}
}
