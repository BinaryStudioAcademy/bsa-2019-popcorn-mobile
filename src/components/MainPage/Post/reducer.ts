import { fetchPosts, fetchPost } from './../../../redux/routines';
import { ADD_POST, ADD_NEW_REACTION, ADD_NEW_COMMENT } from './actionTypes';
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
					post.id === action.payload.id ? action.payload : post
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
		case ADD_NEW_REACTION:
			const statePosts = [...state.posts];
			const { reactions, postId } = action.payload;

			const i = statePosts.findIndex(item => item.id === postId);
			if (i === -1) return state;
			statePosts[i].reactions = [...reactions];
			return {
				...state,
				posts: [...statePosts]
			};
		case ADD_NEW_COMMENT:
			if (!state.posts) {
				return state;
			}
			const postsComment = [...state.posts];
			const comment = action.payload.comment.comment;

			const index = postsComment.findIndex(item => item.id === postId);
			if (index === -1) {
				return state;
			}
			const post = postsComment[index];
			if (!post.comments) post.comments = [comment];
			else post.comments.push(comment);
			return {
				...state,
				posts: [...postsComment]
			};
		default:
			return state;
	}
}
