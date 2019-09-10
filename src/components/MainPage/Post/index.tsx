import { addPost, deletePost, createReaction, addNewReaction } from './actions';
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
}

class PostComponent extends React.Component<IProps> {
	constructor(props) {
		super(props);
		this.addSocketEvents(props.addPost, props.addNewReaction);
	}

	componentDidMount() {
		this.props.fetchPosts();
	}

	addSocketEvents = (addPost, addNewReaction) => {
		SocketService.on('new-post', addPost);
		SocketService.on('new-reaction', obj =>
			addNewReaction(obj.reactions, obj.postId)
		);
	};

	renderPost({ item }) {
		const {
			currUserId,
			deletePost,
			createReaction,
			addNewReaction
		} = this.props;
		return (
			<Post
				post={item}
				navigation={this.props.navigation}
				isCreator={currUserId === item.user.id}
				userId={currUserId}
				deletePost={deletePost}
				reactPost={createReaction}
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
	addNewReaction
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostComponent);
