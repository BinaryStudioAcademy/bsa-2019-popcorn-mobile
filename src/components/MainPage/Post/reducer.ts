import { fetchPosts } from './../../../redux/routines';
import { ADD_POST } from './actionTypes';
import IPost from './IPost';

const initialState: {
	posts: any;
	newPost?: IPost;
	error: Error | null;
	loading: boolean;
} = {
	posts: null,
	error: null,
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case fetchPosts.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchPosts.SUCCESS:
			return {
				...state,
				posts: action.payload
			};
		case fetchPosts.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case fetchPosts.FULFILL:
			return {
				...state,
				loading: false
			};
		case ADD_POST:
			const posts = state.posts
				? [action.payload.story, ...state.posts]
				: [action.payload.story];
			return {
				...state,
				posts
			};
		default:
			return state;
	}
}
