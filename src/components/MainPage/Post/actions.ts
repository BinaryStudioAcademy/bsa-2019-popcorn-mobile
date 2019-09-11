import {
	ADD_POST,
	SEND_POST,
	DELETE_POST,
	REACT_POST,
	ADD_NEW_REACTION,
	ADD_NEW_COMMENT,
	CREATE_COMMENT
} from './actionTypes';
import IPost from './IPost';
import IReaction from './IReaction';
import IComment from './IComment';

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

export const createReaction = (
	type: string,
	userId: string,
	postId: string
) => {
	return {
		type: REACT_POST,
		payload: {
			type,
			userId,
			postId
		}
	};
};

export const addNewReaction = (reactions: IReaction[], postId: string) => {
	return {
		type: ADD_NEW_REACTION,
		payload: {
			reactions,
			postId
		}
	};
};

export const createComment = (userId: string, text: string, postId: string) => {
	return {
		type: CREATE_COMMENT,
		payload: {
			userId,
			text,
			postId
		}
	};
};

export const addNewComment = (comment: IComment) => {
	return {
		type: ADD_NEW_COMMENT,
		payload: {
			comment
		}
	};
};
