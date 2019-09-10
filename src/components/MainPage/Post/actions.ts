import { ADD_POST, SEND_POST, DELETE_POST } from './actionTypes';
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

export const deletePost = (postId: string) => {
	return {
		type: DELETE_POST,
		payload: {
			postId
		}
	};
};
