import { ADD_STORY } from './actionTypes';

export const addStory = story => {
	return {
		type: ADD_STORY,
		payload: {
			story
		}
	};
};