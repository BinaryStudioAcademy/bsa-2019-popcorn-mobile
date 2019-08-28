import { ADD_POST, SEND_POST } from './actionTypes';
import IPost from './IPost';

export const addPost = post => {
	return {
		type: ADD_POST,
		payload: {
			post
		}
	};
};

export const sendPost = (post: IPost) => {
	return {
		type: SEND_POST,
		payload: {
			post
		}
	};
};
