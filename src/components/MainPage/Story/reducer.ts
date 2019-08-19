import { fetchStories } from './../../../redux/routines';
import { ADD_STORY } from './actionTypes';
import INewStory from './INewStory';

const initialState: {
	stories: any;
	newStory: INewStory;
	cursorPosition: { start: number; end: number };
} = {
	stories: null,
	newStory: {
		image_url: null,
		caption: '',
		activity: null,
		type: ''
	},
	cursorPosition: { start: 0, end: 0 }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case fetchStories.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case fetchStories.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case fetchStories.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case fetchStories.FULFILL:
      return {
        ...state,
        loading: false,
      };
      case ADD_STORY:
			const stories = state.stories
				? [action.payload.story, ...state.stories]
				: [action.payload.story];
			return {
				...state,
				stories
			};
    default:
      return state;
  }
}