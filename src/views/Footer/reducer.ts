import { HIDE_FOOTER, SHOW_FOOTER } from './actionTypes';

const initialState: {
	isShown: boolean
} = {
    isShown: true
};

export default function(state = initialState, action) {
	switch (action.type) {
		case HIDE_FOOTER:
			return {
				...state,
				isShown: false
            };
        case SHOW_FOOTER:
			return {
				...state,
				isShown: true
			};
		default:
			return state;
	}
}
