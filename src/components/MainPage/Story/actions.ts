import { ADD_STORY } from './actionTypes';

export const addStory = story => {
	return {
		type: ADD_STORY,
		payload: {
			story
		}
	};
};
export const sendStory = (post: IPost) => {
	return {
		type: SEND_STORY,
		payload: {
			post
		}
	};
};
