import { ADD_STORY, SEND_STORY } from './actionTypes';
import INewStory from './INewStory';

export const addStory = story => {
	return {
		type: ADD_STORY,
		payload: {
			story
		}
	};
};
export const sendStory = (story: INewStory) => {
	return {
		type: SEND_STORY,
		payload: {
			story
		}
	};
};
