import {
	addPost,
	deletePost,
	createReaction,
	addNewReaction,
	addNewComment
} from './actions';
import { fetchPosts } from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import React from 'react';
import Post from './Post/Post';
import IPost from './IPost';
import SocketService from '../../../helpers/socket.helper';
import IReaction from './IReaction';
import Spinner from '../../Spinner/Spinner';
import IComment from './IComment';

interface IProps {
	posts?: null | Array<IPost>;
	error: null | Error;
	loading: boolean;
	fetchPosts: () => any;
	addPost: (post: any) => any;
	deletePost: (postId: string) => any;
	userId?: string;
	navigation: any;
	currUserId: string;
	createReaction: (type: string, userId: string, postId: string) => any;
	addNewReaction: (reactions: IReaction[], postId: string) => any;
	addNewComment: (comment: IComment) => any;
	prevScreen: string;
}

class PostComponent extends React.Component<IProps> {
	constructor(props) {
		super(props);
		this.addSocketEvents(
			props.addPost,
			props.addNewReaction,
			props.addNewComment
		);
	}

	componentDidMount() {
		this.props.fetchPosts();
	}

	addSocketEvents = (addPost, addNewReaction, addNewComment) => {
		SocketService.on('new-post', addPost);
		SocketService.on('new-reaction', obj =>
			addNewReaction(obj.reactions, obj.postId)
		);
		SocketService.on('new-comment', addNewComment);
	};

	renderPost({ item }) {
		const { currUserId, deletePost, createReaction, prevScreen } = this.props;

		return (
			<Post
				post={item}
				navigation={this.props.navigation}
				isCreator={currUserId === item.user.id}
				userId={currUserId}
				deletePost={deletePost}
				reactPost={createReaction}
				prevScreen={prevScreen}
			/>
		);
	}

	render() {
		const { posts, userId } = this.props;
		if (posts) {
			const showPosts = userId
				? posts.filter(post => post.user.id == userId)
				: posts;
			return (
				showPosts && (
					<FlatList
						refreshing={false}
						data={showPosts}
						keyExtractor={item => item.id}
						renderItem={({ item }) => this.renderPost({ item })}
					/>
				)
			);
		} else {
			return <Spinner />;
		}
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	posts: rootState.post.posts,
	error: rootState.post.error,
	loading: rootState.post.loading,
	currUserId: rootState.authorization.profileInfo.id
});

const actions = {
	fetchPosts,
	addPost,
	deletePost,
	createReaction,
	addNewReaction,
	addNewComment
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostComponent);
