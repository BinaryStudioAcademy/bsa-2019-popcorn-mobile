import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Alert } from 'react-native';

import PostComponent from '../../components/MainPage/Post';
interface IProps {
	posts?: any;
	getUsersPosts: () => any;
	userId: string;
}
const postsUser = {
	user: {
		name: 'User',
		avatar: '1',
		id: '12'
	},
	id: '123',
	image_url: 'ad'
};

class UserPosts extends Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}
	render() {
		// if (!posts) {
		//     // getUsersPosts();
		//     this.props.getUsersPosts();
		//     return <Spinner />;
		// }

		const { posts, getUsersPosts } = this.props;

		return <PostComponent posts={postsUser} />;
	}
}

export default UserPosts;
