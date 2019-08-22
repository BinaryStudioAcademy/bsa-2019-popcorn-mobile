import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import PostComponent from '../../components/MainPage/Post';
interface IProps {
	posts?: any;
	getUsersPosts: () => any;
	selectedProfileInfo: any;
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
		const { selectedProfileInfo } = this.props;
		// Alert.alert('selectedProfileInfo = ', selectedProfileInfo);
		// Alert.alert('this.props', this.props);
		const { posts, getUsersPosts } = this.props;
		return <PostComponent userId={selectedProfileInfo.id} />;
	}
}

const mapStateToProps = (rootState, props) => ({
	selectedProfileInfo: rootState.authorization.profileInfo
});

export default connect(mapStateToProps)(UserPosts);
