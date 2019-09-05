import { ADD_STORY, SEND_STORY, SEND_VOTING } from './actionTypes';
import INewStory from './INewStory';
import IVoting from './Voting/IVoting';

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

export const sendVoting = (voting: IVoting) => {
	return {
		type: SEND_VOTING,
		payload: voting
	};
};
