import { fetchPosts, fetchPost } from './../../../redux/routines';
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
		case fetchPost.TRIGGER:
			return {
				...state,
				loading: true
			};
		case fetchPosts.SUCCESS:
			return {
				...state,
				posts: action.payload
			};
		case fetchPost.SUCCESS:
			return {
				...state,
				posts: state.posts.map(post =>
					post.id === action.post.id ? action.post : post
				)
			};
		case fetchPosts.FAILURE:
		case fetchPost.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case fetchPosts.FULFILL:
		case fetchPost.FULFILL:
			return {
				...state,
				loading: false
			};
		case ADD_POST:
			const posts = state.posts
				? [action.payload.post, ...state.posts]
				: [action.payload.post];
			return {
				...state,
				posts
			};
		default:
			return state;
	}
}
