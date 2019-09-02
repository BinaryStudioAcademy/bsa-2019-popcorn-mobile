import { addPost } from './actions';
import { fetchPosts } from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import React from 'react';
import Post from './Post/Post';
import IPost from './IPost';
import SocketService from '../../../helpers/socket.helper';

import Spinner from '../../Spinner/Spinner';

interface IProps {
	posts?: null | Array<IPost>;
	error: null | Error;
	loading: boolean;
	fetchPosts: () => any;
	addPost: (post: any) => any;
	userId?: string;
}

class PostComponent extends React.Component<IProps> {
	constructor(props) {
		super(props);
		this.addSocketEvents(props.addPost);
	}

	componentDidMount() {
		this.props.fetchPosts();
	}

	addSocketEvents = addPost => {
		SocketService.on('new-post', addPost);
	};

	renderPost({ item }) {
		return <Post post={item} />;
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
	loading: rootState.post.loading
});

const actions = {
	fetchPosts,
	addPost
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostComponent);
