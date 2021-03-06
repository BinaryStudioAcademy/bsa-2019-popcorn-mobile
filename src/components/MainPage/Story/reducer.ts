import { fetchStories } from './../../../redux/routines';
import { ADD_STORY, CHANGE_ACTIVITY } from './actionTypes';

const initialState: {
	stories: any;
	newVoting?: { type: string; activity: any };
	error: Error | null;
	loading: boolean;
} = {
	stories: null,
	error: null,
	loading: false,
	newStory: {
		image_url: null,
		caption: '',
		activity: null,
		type: ''
	}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case fetchStories.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchStories.SUCCESS:
			return {
				...state,
				stories: action.payload
			};
		case fetchStories.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case fetchStories.FULFILL:
			return {
				...state,
				loading: false
			};
		case ADD_STORY:
			const stories = state.stories
				? [action.payload.story, ...state.stories]
				: [action.payload.story];
			return {
				...state,
				stories
			};
		case CHANGE_ACTIVITY:
			return {
				...state,
				newVoting: {
					...state.newVoting,
					type: action.payload.type,
					activity: action.payload.activity
				},
				photoSaved: false
			};
		default:
			return state;
	}
}
