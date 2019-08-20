import {
	login,
	register,
	fetchUser
} from '../../redux/routines';

const initialState = {
	profileInfo: null,
	loginError: null,
	registerError: null,
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case login.TRIGGER: 
			return {
				...state,
				loading: true
			};
		case register.TRIGGER: 
			return {
				...state,
				loading: true
			};
		case fetchUser.TRIGGER: 
			return {
				...state,
				loading: true
			};
		case login.SUCCESS:
			return {
				...state,
				profileInfo: action.payload.user
			};
		case login.FAILURE:
			return {
				...state,
				loginError: action.payload
			};
		case register.FAILURE:
			return {
				...state,
				registerError: action.payload
			};
		default:
			return state;
	}
}
