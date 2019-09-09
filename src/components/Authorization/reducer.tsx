import { login, register, fetchUser, logout } from '../../redux/routines';
import IUser from '../UserPage/IUser';

const initialState: {
	profileInfo: null | IUser;
	loginError: null | string;
	registerError: null | string;
	loading: boolean;
} = {
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
				loginError: '',
				registerError: '',
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
		case logout.SUCCESS: 
			return {
				...state,
				profileInfo: null
			}
		default:
			return state;
	}
}
